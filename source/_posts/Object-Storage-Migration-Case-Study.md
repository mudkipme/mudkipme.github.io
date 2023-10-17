---
title: Object Storage Migration Case Study
date: 2023-10-18 00:21:01
tags:
---

## Background

Hundreds of thousands of image files are stored on [52Poké Wiki](https://52poke.wiki/). Previously, we used AWS S3 to store all these images, AWS Lambda for image processing (generating thumbnails and converting to WebP format), and two layers of cache (a container on Linode and Cloudflare CDN) for image distribution.

Our monthly AWS bill increased gradually due to the growing number of images and traffic each month. Even with two layers of cache, more than 280GB of traffic defaulted to AWS S3, incurring a $20 expense every month.

Fortunately, there are many S3-compatible services available at much more competitive prices. We considered switching to Cloudflare R2, Backblaze B2, or Linode Object Storage.

## Choice

Currently, we have 150GB of files. It costs $2.25 every month to store on Cloudflare R2, $0.9 for Backblaze B2, and $5 for Linode Object Storage. Egress traffic charges are zero for all services: Backblaze B2 doesn't charge for 3x the monthly data stored, Linode uses a traffic pool that sufficiently covers our usage, and Cloudflare never charges for egress bandwidth. If the data storage increases to 250GB, it will cost $3.75 on Cloudflare, $1.5 on Backblaze, and remain $5 on Linode.

However, since the main services of 52Poké are located in Linode's Tokyo datacenter, there is significant latency when proxying from the other side of the Pacific Ocean. Linode recently [announced](https://www.linode.com/blog/linode/core-compute-regions-milan-and-osaka/) Object Storage availability in their Osaka datacenter, and with a latency of only 8ms between Tokyo and Osaka, this is an optimal choice performance-wise. We can also eliminate one cache layer (20GB) backed by block storage, saving $2 monthly. Ultimately, by migrating from AWS S3 to Linode Object Storage, we can save $17 every month.

## Steps

### Creating a Bucket on Linode and Setting Up the Bucket Policy

We can create an Object Storage bucket in Akamai Cloud Manager with the bucket name `media.52poke.com`.

Previously, we configured a bucket policy on S3 to allow access solely from the IP addresses of 52Poké's cloud servers. While Akamai Cloud Manager doesn't support direct bucket policy configurations, they can be set up using `s3cmd` as per [Linode's documentation](https://www.linode.com/docs/products/storage/object-storage/guides/bucket-policies/).

The bucket policy looks like this:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::media.52poke.com/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": [
                        "..."
                    ]
                }
            }
        }
    ]
}
```

### Full Migration

To minimize disruption to 52Poké Wiki during this migration, we'll implement a two-step mechanism. First, we'll migrate all files from the AWS S3 bucket and allow users to upload or update files. Later, we'll conduct an incremental migration, which should take considerably less time.

A Kubernetes job will be used to run `rclone sync` to sync all files to the new Linode Object Storage bucket. For the access key ID and secret access key of Linode Object Storage, we'll use [SOPS](https://fluxcd.io/flux/guides/mozilla-sops/) to encrypt and store them in the Git repository. These can then only be decrypted with the private key in the 52Poké Kubernetes cluster and deployed automatically.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: migrate-media
  namespace: default
spec:
  ttlSecondsAfterFinished: 100
  template:
    spec:
      containers:
      - command:
        - /bin/sh
        - -c
        - rclone sync awss3:media.52poke.com los:media.52poke.com
        env:
        - name: RCLONE_CONFIG_AWSS3_TYPE
          value: s3
        - name: RCLONE_CONFIG_AWSS3_ACCESS_KEY_ID
          valueFrom:
            secretKeyRef:
              key: accessKeyID
              name: aws-s3
        - name: RCLONE_CONFIG_AWSS3_SECRET_ACCESS_KEY
          valueFrom:
            secretKeyRef:
              key: secretAccessKey
              name: aws-s3
        - name: RCLONE_CONFIG_LOS_TYPE
          value: s3
        - name: RCLONE_CONFIG_LOS_ACCESS_KEY_ID
          valueFrom:
            secretKeyRef:
              key: accessKeyID
              name: linode-object-storage
        - name: RCLONE_CONFIG_LOS_SECRET_ACCESS_KEY
          valueFrom:
            secretKeyRef:
              key: secretAccessKey
              name: linode-object-storage
        - name: RCLONE_CONFIG_LOS_ENDPOINT
          value: jp-osa-1.linodeobjects.com
        image: rclone/rclone:latest
        imagePullPolicy: Always
        name: migrate-media
      restartPolicy: Never
```

### Disabling Uploads

In the second step, we must disable uploads on MediaWiki to prevent data loss. This can be configured via `LocalSettings.php`.

```php
$wgEnableUploads = false;
```

### Incremental Migration

We'll now run the Kubernetes job again to sync updates from the old AWS S3 bucket to the new one. Additionally, we'll manually check that recently uploaded files from 52Poké Wiki have been synced to the new bucket.

### Updating Malasada

[Malasada](https://github.com/mudkipme/malasada) is an AWS Lambda Serverless function designed to generate image thumbnails and convert images to the WebP format to conserve bandwidth.

Previously, we used an IAM policy to grant the Serverless function access to the S3 bucket. Now, with the shift from AWS S3, we'll need to manually provide the access key ID, secret access key, and the endpoint of Linode Object Storage to the Serverless function using environment variables.

```typescript
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
});
```

### Configuring Nginx

The Nginx configuration for the domains `media.52poke.com`, `s0.52poke.wiki`, and `s1.52poke.wiki` must be updated to replace the AWS S3 domain with that of Linode Object Storage. We also removed the persistent volume claim backed by block storage from the nginx deployment.

```nginx
proxy_pass http://media.52poke.com.jp-osa-1.linodeobjects.com$request_uri;
```

After updating the nginx configuration, we noticed all requests were failing due to permission issues. However, there was no issue when requesting the upstream Object Storage URL with `curl` in the nginx container.

Upon further investigation, we determined that Linode Object Storage was blocking requests containing "X-Forwarded-For" and "X-Real-IP" headers because these headers didn't align with the bucket policy. Removing these headers from the request resolved the issue.

```nginx
proxy_set_header X-Real-IP '';
proxy_set_header X-Forwarded-For '';
```

### Configuring MediaWiki

We now need to adjust the [AWS S3 MediaWiki extension](https://github.com/edwardspec/mediawiki-aws-s3) to use Linode Object Storage instead of AWS S3. This adjustment can be quickly made via the `endpoint` parameter. Afterward, we can re-enable file uploading on MediaWiki.

```php
$wgFileBackends['s3']['endpoint'] = 'http://jp-osa-1.linodeobjects.com';
$wgEnableUploads = true;
```

### Configuring WordPress

The 52Poké homepage uses the [WP Offload Media Lite](https://wordpress.org/plugins/amazon-s3-and-cloudfront/) plugin to upload files to S3. While the plugin's admin page doesn't offer functionality to change the object storage endpoint, our investigation of the source code revealed hooks that allow modifying the S3 connection configuration. This can be adjusted in `wp-config.php`.

```php
add_filter( 'as3cf_aws_s3_client_args', function ( $args ) {
    $args['endpoint']               = 'https://jp-osa-1.linodeobjects.com';
    $args['region']                 = 'jp-osa-1';
    $args['use_path_style_endpoint'] = true;
    return $args;
} );
add_filter( 'as3cf_aws_get_regions', function ( $regions ) {
    $regions = array(
        'jp-osa-1' => 'Osaka',
    );
    return $regions;
} );
add_filter( 'as3cf_aws_s3_bucket_in_path', '__return_true' );
add_filter( 'as3cf_aws_s3_domain', function ( $domain ) {
    return 'linodeobjects.com';
} );
```

### Backup

As the migration nears completion, it's important to remember that we have a cron job set up to back up files from AWS S3 to Backblaze B2. We'll need to update the backup source to Linode Object Storage, which can be achieved through the environment variables of `rclone`.

```yaml
env:
- name: RCLONE_CONFIG_MEDIA_TYPE
  value: s3
- name: RCLONE_CONFIG_MEDIA_ACCESS_KEY_ID
  valueFrom:
	secretKeyRef:
	  key: accessKeyID
	  name: linode-object-storage
- name: RCLONE_CONFIG_MEDIA_SECRET_ACCESS_KEY
  valueFrom:
	secretKeyRef:
	  key: secretAccessKey
	  name: linode-object-storage
- name: RCLONE_CONFIG_MEDIA_ENDPOINT
  value: jp-osa-1.linodeobjects.com
```

## Conclusion

52Poké Wiki successfully transitioned from AWS S3 to Linode Object Storage for image storage. Despite the availability of lower-cost options like Cloudflare R2 and Backblaze B2, Linode Object Storage was the optimal choice given its low latency benefits and the site's primary services being located in Linode's Tokyo datacenter. With this change, we anticipates a monthly savings of $17 and enhanced performance. Through a careful migration process, including addressing challenges with permissions and configurations, the transition was executed smoothly. This move underscores the importance of regularly evaluating and optimizing infrastructure choices to ensure both cost-effectiveness and performance for online communities.
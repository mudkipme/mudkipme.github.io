---
title: Project Updates (Q1 2023)
date: 2023-04-09 14:28:04
tags:
---

## Home Projects

As my family moved to a new place, I have been rearranging our network and computer equipment.

The first new hardware to arrive at my home in 2023 is an [iKOOLCORE R1](https://www.ikoolcore.com/). It is a tiny x86 computer with four 2.5GbE NICs pre-installed with Proxmox VE and OpenWrt. I named this device *"rotom"* and use it as a router. I also set up a Debian VM called *"rotom-core"* as a "side gateway." This addition has vastly improved my home network experience, in terms of both responsiveness and functionality.

I have tinkered with a few configurations of the open-source router system. One benefit of OpenWrt is its ability to configure IPv6 firewalls. I wanted to open a specific port on *rotom-core* to allow me to connect back to my home network while blocking all other incoming connections. However, most home networks have dynamic IPv6 address prefixes, and only the suffix is static. Fortunately, this can be easily set up in OpenWrt:

```
config rule
        option target 'ACCEPT'
        option src 'wan'
        option dest 'lan'
        option name '<rule name>'
        option family 'ipv6'
        option proto 'tcp'
        option dest_ip '::<IPv6 address suffix>/::ffff:ffff:ffff:ffff'
        option dest_port '<Port I want to open>'
```

I wanted certain devices on my home network to use *rotom-core* as the gateway; however, some devices (like Sonos) do not allow for configuring static IP and gateway. To address this, I added an entry in the DHCP settings to pin the DHCP response to these devices.

```
config host
        option name 'SonosOne'
        option dns '1'
        option mac '<mac address>'
        option ip '192.168.1.31'
        option tag 'tag1'

config tag 'tag1'
        option dhcp_option '3,192.168.1.2 6,192.168.1.2'
```

One issue I faced previously was the inability to change or disable the IPv6 DNS server on Android, rendering the DNS server settings useless in a dual-stack network environment. OpenWrt allows me to disable the announcement of the IPv6 DNS server address.

```
config dhcp 'lan'
        ...
        option dns_service '0'
```

In *rotom-core*, besides the critical services I prefer not to mention, there are also containers running [frpc](https://github.com/fatedier/frp) and [cloudflared](https://github.com/cloudflare/cloudflared) to enable connection to my home network from IPv4-only networks. Additionally, there is [cloudflare-ddns](https://github.com/timothymiller/cloudflare-ddns) to update the AAAA record in DNS.

After receiving this new tiny PC, I benchmarked it using [p7zip](https://packages.debian.org/bullseye/p7zip-full) and compared it to my Frost Canyon NUC (*"comet"*, named after Comet Lake). Surprisingly, it outperformed the i7-10710U by 200% in both single-core and multi-core tests, which indicated an issue with the NUC.

Two possibilities came to my mind. I thought it could be related to how VMware ESXi handles turbo boost, or the cooling system in the NUC had melted down. After turning off the NUC and waiting for half an hour, the CPU speed greatly improved, but it soon hit rock bottom. Thus, it must be the cooling.

There are various videos suggesting that the thermal silicone between the CPU and cooler needs to be replaced. I purchased a small Honeywell phase change pad and prepared to fix the NUC. However, I made a mistake at the first step; I broke a screw on the motherboard, and it was impossible to pull out.

I eventually gave up and only cleaned the air outlet of the cooler. Surprisingly, it worked. Now, the NUC is much faster and makes significantly less noise than before. I regret not noticing this problem earlier.

A k3s worker node VM in *comet* has been replaced by a Fedora Workstation VM named *"comet-core"*, since the services in the home Kubernetes cluster don't require too much memory. I want to experiment with different Linux distributions, and the VM allows me to work on tasks that the Raspberry Pi can't handle.

I also migrated the hypervisor of *comet* from VMware ESXi to Proxmox VE. Initially, I wanted to try [GVT-g Split Passthrough](https://3os.org/infrastructure/proxmox/gpu-passthrough/igpu-split-passthrough/#proxmox-configuration-for-gvt-g-split-passthrough) to enable both the Windows VM and the Fedora VM to access the iGPU. However, the split performance was not sufficient to provide a smooth RDP experience. Nevertheless, I appreciate Proxmox VE's flexibility and LXC features.

## 52Poké

52Poké Wiki has been upgraded to MediaWiki 1.39, featuring numerous improvements under the hood. I am a fan of the new Vector-2022 skin[^1] (with the `max-width` option disabled). It is clear, vibrant, responsive, and fully-fledged.

The Kubernetes cluster of 52Poké is now synchronized with [this git repository](https://github.com/mudkipme/52poke) via GitOps, using [FluxCD](https://fluxcd.io/). Additionally, the database server has been moved into the cluster, thanks to NVMe Block Storage. All nodes have been upgraded to 4 CPU core 8GB memory instances, and the number of nodes has been reduced (currently only 2), helping to decrease the total cost.

One issue that occasionally stresses the 52Poké Wiki is when editing a template used by hundreds of pages. MediaWiki attempts to purge the cache of every page using this template. When hundreds of pages load without cache, the MediaWiki instance may freeze. I am developing a [new web server](https://github.com/mudkipme/52poke/wiki/Inazuma) to address this issue. It will implement a persistent cache layer, inspired by the concept of [Cloudflare Cache Reserve](https://developers.cloudflare.com/cache/about/cache-reserve/). This approach allows the cache purging process to work in an asynchronous queue, updating the persistent cache instead of deleting it. Ideally, this will enable the backend MediaWiki instance to handle much fewer requests while ensuring that page edits are updated for all visitors as quickly as possible.

Since April 2023, Linode (now Akamai Connected Cloud) has increased its computing prices by 20%. This has prompted me to consider how to maintain the long-term sustainability of 52Poké Wiki. Up until now, I have been covering all the monthly bills from Linode, but there is always a risk of facing financial difficulties at some point in the coming years. I hope that 52Poké Wiki can eventually be partly supported by its community and visitors; however, I have not yet found a viable solution to achieve this.

## Moe Memos

Initially, [Moe Memos](http://memos.moe/) was a niche open-source project developed to meet my personal needs and maintain my hands-on experience with app development. However, it has since become a much larger success. As of now, over 3,500 users have installed the app from App Store and Google Play (excluding GitHub and F-Droid downloads). It has evolved into a feature-rich app for [Memos](https://github.com/usememos/memos) while maintaining its minimalistic design.

I still have many ideas for this charming project, ranging from implementing major features such as local storage (hoping for a revamp of Core Data this June) and multi-server/user support, to refactoring the project structure and adding a tipping feature to motivate me to continue working on it and explore more ideas for the self-hosted community.

## AI Experiments

The past few months have undoubtedly been an AI Summer, with news related to AI projects such as ChatGPT, New Bing, Office 365 Copilots, Stable Diffusion, and Midjourney flooding my mind every few hours.

I initially tried to resist the hype, but I eventually succumbed after the release of the GPT-3.5-Turbo API and GPT-4 model. I experimented with various things involving LLMs and AI art generators. I read a letter that Yui from Sword Art Online sent to Asuna and Kirito and asked her what everyday life is like as an AI in the VRMMO world. I [interviewed a Pokémon Trainer in Hoenn](https://mudkip.me/2023/03/16/Interviewing-Luna-a-Pokemon-Trainer-from-Slateport-City/) about her epic journey. I asked ChatGPT to write [the first commit of the web server](https://github.com/mudkipme/inazuma/tree/0.0.1) I mentioned earlier. I even allowed it to be a Pikachu with no knowledge of human language, experiencing the atmosphere of Snowpoint City and battling a Glalie. In addition, I have written stories such as "Takami Chika Meets Her Real World Counterpart Inami Anju" and "The Birth of Amane Suzuha in the Steins;Gate Timeline". I also used Midjourney to design alternative icons for Moe Memos.

Another entertaining project stemmed from an idea inspired by Persona 5. I asked ChatGPT, "You are the main character of Persona 5. You found a palace belonging to Donald Trump. What does Donald Trump's palace look like, and how will your team obtain the treasure within it?" The response was both hilarious and reasonable. I tried a few other names, ranging from real-world villains to absurdities like "[MacBook Pro with Butterfly Keyboard](https://indieweb.social/@mudkip/110057112299714330)." Eventually, I created a _[Persona 5 Palace Generator](https://p5-palace-generator.vercel.app/)_ in about an hour with ChatGPT's help. I have more intriguing ideas stemming from this, but I prefer to keep them secret for now.

I am still uncertain about how LLMs, generative AI, and future AGI will change our world, or whether the change will be overwhelmingly positive. I remain concerned that [widespread poverty may result from these advances](https://indieweb.social/@stevestreza/109674963990228250). I still prefer to enjoy [technologies I can reason with, predict, and reproduce variants of](https://mastodon.gamedev.place/@bitinn/110089849000582865). I am annoyed by the [racial/regional discrimination](https://indieweb.social/@mudkip/110078732296586867) that makes it difficult to use and pay for OpenAI and other services. I hope humanity can find and [imagine](https://indieweb.social/@mudkip/110157754411778217) a path to a better future.

[^1]: I understand that there are many controversies surrounding the Vector-2022 skin in the Wikipedia community, and perhaps within 52Poké/Encyclopaediae Pokémonis as well.

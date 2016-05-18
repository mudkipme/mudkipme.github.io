---
title: 如何用得起 MediaWiki
date: 2014-01-05 20:42:16
tags: mediawiki
---

[MediaWiki](https://www.mediawiki.org/) 最初为运行维基百科而设计的开源程序，目前服务于超过一万的 Wiki 站点。[神奇宝贝百科](http://wiki.52poke.com/)自2010年9月起运行于 MediaWiki，3年多来积累了很多心得，虽然内容和访问量迅速增长，但服务器开支依然保持在负担得起的范围。水跃希望在这里记录和分享。

日志标题中「用得起」的假设是运行在一台 1GB RAM 虚拟（云）服务器，日页面访问量在一百万以内。市场上 1GB RAM 的 VPS 价格约 10 ～ 30 美元每月。MediaWiki 并不适合运行在共享虚拟主机，或内存不到 512MB 的服务器中。

另外，[MediaWiki 官方网站](http://www.mediawiki.org/wiki/Manual:Performance_tuning)提供了一些基本的优化方式，非常值得参考。

## MediaWiki 很耗资源么

是的。相较其他流行的 PHP 开源应用，MediaWiki 可以认为更耗资源，尤其是 CPU 使用，一篇包含复杂模板嵌套的文章，在无缓存状态下的渲染时间可能长达数秒，甚至数十秒。

经历了十多年的发展，MediaWiki 也是一个[架构设计优雅](http://aosabook.org/en/mediawiki.html)的工程，具有非常强大的功能和可定制性，其性能开销往往是必要的。合理运用多重优化手段方式，可以有效降低 MediaWiki 的性能开销。

## 使用高性能的 Web 服务器程序

如果在生产环境使用最新版本的服务器程序，往往会引起很大的争议。但事实上，开源程序往往可以保持对较新版本系统环境很好的兼容性，新版本的系统环境往往具有更少的 Bug 和非常大的性能提升。

[52Poké](http://52poke.com/) 所在的虚拟服务器采取了较为激进的做法，自2011年后一直使用 [Arch Linux](https://www.archlinux.org) 操作系统，其滚动升级的特性可以让包管理（pacman）安装的应用都保持在最新版本，同时 Linode 也默认提供了最新版本的 Linux 内核。虽然对基础服务大版本的升级危险较大，但两年多来数十次 `pacman -Syu` 并未带来很大麻烦，除了在某几个凌晨造成数十分钟的不可用（都是由于较长时间未升级造成跨度较大并且操作失误）。

回到主题，对 MediaWiki 而言，高性能的 Web 服务器程序除了意味着 PHP 5.5，MySQL/MariaDB 5.5+；也包括使用 PHP 5.5 内置的 [OPcache](http://php.net/opcache) 加速，以及使用 [Nginx](http://nginx.org) + [php-fpm](http://php-fpm.org) 代替 Apache，[Memcached](http://memcached.org) 和/或 [Redis](http://redis.io) 缓存等。

当前支持神奇宝贝百科的[服务器程序](http://wiki.52poke.com/wiki/Special:%E7%89%88%E6%9C%AC%E4%BF%A1%E6%81%AF)为 PHP 5.5.7，MariaDB（MySQL 对社区友好的一个变体）5.5.34，Nginx 1.4.4 以及 Memcached 1.4.17。

## 合理的配置文件

MediaWiki 的默认配置（`LocalSettings.php`）并不适合生产环境，这里简要介绍一个低能耗的 MediaWiki 系统需要增加的配置项：

* `$wgDisableCounters = true;` 关闭内置的统计功能，如需要统计访问量可以使用 Google Analytics 等外部服务。
* `$wgWellFormedXml = false;` 以及 `$wgHtml5 = true;` 打开 HTML5 标签输出并关闭兼容 XML 语法，可以降低页面的体积。
* `$wgShowIPinHeader = false;` 关闭未登录用户在右上角显示 IP 地址，以便使用静态缓存。
* `$wgUseGzip = true;` 开启 gzip 压缩，降低页面体积，另外也可在 Web 服务器中配置开启 gzip。
* `$wgMiserMode = true;` 关闭实时生成特殊页面；建议同时在 cron 里配置定时任务，定期生成特殊页面。
* `$wgJobRunRate = 0.01;` 减少执行任务的频率（即每次请求有1%的几率运行任务）；MediaWiki 的任务往往需要耗费数秒的时间执行，默认运行频率为1，一旦插入任务就可能导致 PHP 进程全部被占满；这里同样建议在 cron 里配置定时任务运行 MediaWiki 的任务，以免使任务队列积累过多。
* `$wgInvalidateCacheOnLocalSettingsChange = false;` 关闭修改 LocalSettings.php 使所有缓存失效的特性；MediaWiki 的缓存完全失效是非常可怕的，几乎可以迅速致服务器僵死。

## 服务器端缓存

MediaWiki 的稳定运行，opcode 缓存、object 缓存和页面缓存都是必不可少的。

### opcode 缓存

opcode 缓存用于加速 PHP 脚本的执行。PHP 5.5 内置了 OPcache（即之前的 ZendOptimizer+），比起 eAccelerator、XCache 和 APC 有更好的性能，只需在 php.ini 中引用 opcache.so 即可使用，同时 OPcache 也可单独安装在 PHP 5.4 或 5.3 环境中。另外需要注意 PHP 5.5.1 及 5.5.2 内置的 OPcache 和 MediaWiki 存在兼容问题，5.5.3 以上版本已解决。

### object 缓存

MediaWiki 可以利用 object 缓存存储包括界面语言文字、文件信息、模板生成的中间产物、最终页面渲染 HTML 等数据。MediaWiki 支持使用 APC、XCache、Memcached、Redis、MySQL 数据库方式缓存数据，但配置中默认未开启 object 缓存功能。在这几种缓存方式中，除 MySQL 数据库外都需要在内存中存储，其中前3种存储方式无法持久化。

这里推荐使用是 Memcached 和 MySQL 结合的方式，配置方式如下：

<pre>$wgMainCacheType = CACHE_MEMCACHED;   
$wgMemCachedServers = array('127.0.0.1:11211');  
$wgParserCacheType = CACHE_DB;</pre>

Memcached 由于将数据存储在内存中，读写速度非常快；存储相同内容的数据占据的内存空间也是几种方式中最小。但 Parser Cache 由于包含了页面完整的 HTML 文本，需要的体积非常大，同时一旦失效则会需要重新解析所有页面，带来巨大的 CPU 开销；在内存有限的条件下更适合存储到较为持久的 MySQL 数据库中。

神奇宝贝百科在2013年初使用 Memcached 曾频繁遇到 Segfault，因此更换到 Redis + MySQL 结合的方式，但 Redis 耗费了更多内存（仅指在 MediaWiki 的使用方式下），也有相对较大的 I/O 使用。2013年12月 Memcached 发布了 1.4.17 更新，解决了不稳定的问题，因此目前又换回使用 Memcached。

### 页面缓存

作为一个 Wiki，对未登录用户而言页面几乎是静态的，所以页面缓存可以非常有效；MediaWiki 提供了 [File cache](https://www.mediawiki.org/wiki/Manual:File_cache) 功能，另外也可以使用 [Squid](https://www.mediawiki.org/wiki/Manual:Squid_caching) 或 [Varnish](https://www.mediawiki.org/wiki/Manual:Varnish_caching) 的功能。而对于只有一台服务器的站点而言，这里更推荐使用 Nginx 自带的 FastCGI 缓存功能。

MediaWiki 默认会根据请求头中的 Accept-Language（即用户浏览器语言）、Cookie 等因素区分不同的页面缓存（可见响应头中的 Vary 行）。但对于单一语言、没有文字变种的 Wiki，只要已登录用户不使用页面缓存，未登录用户访问则看到相同的页面内容即可。

以下是神奇宝贝百科的 FastCGI 缓存配置，为便于介绍去掉了中文简繁处理相关的内容。这里缓存有效期为5小时，可以根据实际情况修改。另外，特殊页面不宜开启静态缓存（如最近更改和随机页面）。

<pre>http {
    ...
    fastcgi_cache_path  /var/cache/nginx/wiki levels=2:2 keys_zone=wiki:128m inactive=5h max_size=2048m;
    
    server {
        ...
        if ($http_cookie ~* "52poke_wikiUserID") {
            set $do_not_cache 1;
        }
        if ($uri ~ "^/wiki/Special:") {
            set $do_not_cache 1;
        }
        if ($args ~ "Special:") {
            set $do_not_cache 1;
        }
        fastcgi_cache wiki;
        fastcgi_ignore_headers Cache-Control Expires;
        fastcgi_hide_header Vary;
        fastcgi_cache_key $uri$is_args$args;
        fastcgi_cache_bypass $do_not_cache;
        fastcgi_no_cache $do_not_cache;
        fastcgi_cache_valid  200 5h;
        fastcgi_cache_valid  301 0;
        fastcgi_cache_valid  404 20m;
    }
}</pre>

使用页面缓存就会遇到缓存更新的问题，好在 MediaWiki 提供了 PURGE 功能，配置后只要相应的页面有更新就会发出 HTTP PURGE 请求。`LocalSettings.php` 中的配置如下：

<pre>$wgUseSquid = true;
$wgSquidServers = array('127.0.0.1’);</pre>

这里只配置了 127.0.0.1 因 52Poké 只有一台前端服务器，并且和 MediaWiki 程序是同一台。不过 Nginx 默认并不支持 PURGE 请求，可以编译安装 [ngx_cache_purge](http://labs.frickle.com/nginx_ngx_cache_purge/) 扩展实现，具体操作步骤可以[参考这里](http://mcnearney.net/blog/2010/2/28/compiling-nginx-cache-purging-support/)。

对于具有文字变种，如中文简繁之分的 Wiki，则情况较为复杂，今后这里会详细讨论 MediaWiki 处理中文简繁的问题，本篇就不详述了。

## 减少模板和文章内容渲染的开销

MediaWiki 提供了非常强大的模板和语法处理功能，尤其是内置的 ParserFunctions 扩展，但语法解析需要非常大的 CPU 开销。

这里建议尽可能减少不必要的模板使用和嵌套。例如对于一些通用的文字、背景颜色、边框样式，更适合在 `MediaWiki:Common.css` 或小工具中使用 CSS 实现。如果文章在编辑后需要等待很长的时间才能加载出来，则需要对其中使用的模板进行优化，必要时可以考虑拆分文章。

MediaWiki 解析图片信息也需要较大的资源消耗，对于较为固定的图片、尤其是尺寸较小的图片，推荐使用 CSS Sprites 而非通过 Wiki 上传。

MediaWiki 也会对包含过多模板嵌套、或者使用了过多语法呼叫（例如 switch 和 if 语法）的文章自动添加警示的分类。

## 选择合适的服务商

基础硬件的性能往往是第一位的，对运行 MediaWiki 而言，CPU、内存、I/O 性能、网络带宽都至关重要。其实早在2006年 52Poké 就搭建了 MediaWiki，但在有上百篇文章之后当时所在的虚拟主机就不堪重负，不得不在后来转型使用自建的程序，直到2010年开始使用 Linode。

就 52Poké 使用 [Linode](https://www.linode.com/?r=f7340c28b6c910d5b5369471c4a029b71eb9b015)*（推介链接）* 的经历而言，Linode 是一家不错的 VPS 提供商，但并不算完美。Linode 在2013年进行了多次升级，在流量、网络速度、CPU 性能和性价比方面有较大优势。

VPS 有一个不稳定因素是 CPU 和 I/O 性能会受同一台物理服务器的邻居影响，52Poké 曾遇到过 CPU %Steal 过高导致性能较差的问题，不过联系客服很快迁移了另一台物理服务器解决。Linode 的 I/O 性能比提供了 SSD 的服务商要差，目前 Linode 只在纽瓦克数据中心提供了测试版 SSD 服务，亚洲用户较多使用的东京数据中心则尚未提供。

## 其他和未来

到这里已经介绍了高性能 MediaWiki 站点的必要条件。不过对于拥有较多图片的 Wiki 来说，可能很容易遇到流量超限或 I/O 消耗较大的问题，推荐如有必要添加一台流量较为廉价的 VPS 存放或缓存图片；另外可以考虑将图片延迟加载，即当浏览者滚动到图片位置时再加载，该功能的 MediaWiki 扩展在完成开发后会开源。

关于 MediaWiki，除了性能之外，还有很多值得讨论的话题。比如扩展，小工具（Gadget），中文的繁简问题，条目命名和内容规范，自动化批量建设内容，版权问题，以及作为一个 Wiki 社群的建设和发展。这些就留在以后继续讨论吧。

对于未来，如何支持移动设备，如何进一步减少服务器端模板的开销是水跃在继续思考的问题。MediaWiki 官方提供了 [MobileFrontend](https://www.mediawiki.org/wiki/Extension:MobileFrontend) 扩展，但根据设备输出不同的内容会带来更多的复杂度和资源消耗，而且可能降低了移动设备的体验；所以我更希望有响应式的方案。对于复杂的表格如果可以服务器只在页面中输出元数据，由 JavaScript 在浏览器中渲染的话，就可以减轻服务器的压力。但修改 Wiki 的 JavaScript 和 CSS 的权限往往不会开放给普通用户，这样做对社区并不利。

2014年的第一篇终于啰嗦完了，这里祝各位新年快乐，也希望 MediaWiki 的同好有所收获吧: )
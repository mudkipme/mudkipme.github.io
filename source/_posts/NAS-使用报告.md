---
title: NAS 使用报告
date: 2017-10-14 11:17:39
tags: nas
---

自 2011 年拥有一台 WD My Book Live，网络附加存储，简称 NAS，就是我的数字生活中非常重要的一部分。目前，一台拥有 12TB 容量的 Synology DS916+ 是我的存储、媒体与智能控制的中心。

## 硬件配置

![](/images/2017/10/1*xa_ccOQgG-pyjhhaqYVQfA.jpeg)

我的 NAS 是一台 Synology DS916+，9 代表 4 盘位 + 可以接入一台 5 盘位的扩展机，16 代表 2016 年款，+ 代表「适用于小型商务环境」的型号。同系列当前最新的型号是 [DiskStation DS918+](https://www.synology.com/zh-cn/products/DS918+)。

目前机内装有 4 块 WD 为 NAS 专用的 4TB 红盘。由于较高故障率的经验，个人并不推荐选择（不过售后服务还不错，目前更换后的硬盘也保持稳定），这可能由于 WD 红盘本身的故障率（参考 [Backblaze 2016 Q3 数据](https://www.backblaze.com/blog/hard-drive-failure-rates-q3-2016/)，根据 [Backblaze 2017 Q2 数据](https://www.backblaze.com/blog/hard-drive-failure-stats-q2-2017/)已有改善）、代理商简陋的包装或电商不安全的运输或三者皆有。

4 块硬盘使用 [Synology Hybrid RAID](https://www.synology.com/zh-cn/knowledgebase/DSM/tutorial/Storage/What_is_Synology_Hybrid_RAID_SHR) 组成 12TB 存储空间和 1 块硬盘容错。混合 RAID 的原因是由于存储空间从原先 6TB 升级而来，底层实际为多个 RAID 5 拼接而成。

NAS 的访问速度除 NAS 本身性能外，还受限于本地网络的速度，为保证理想的访问速度，强烈建议使用 5GHz 802.11ac 标准的路由器，我目前使用的是 ASUS RT-AC68U；远程访问的速度则主要取决于当地 ISP 的上行速度以及是否有公网 IP 地址。

## NAS 使用

### 文件存储

首先 NAS 显而易见的需求是文件管理，Synology DSM 提供了 SMB / AFP / WebDAV 等协议的文件访问方式。由于 Apple 已经弃用 AFP，我也关闭了 AFP 文件共享。

![](/images/2017/10/1*46nJIfO9EjZZxVSBPSE2uw.png)

在 macOS 与 Windows 平台，SMB 是主要的文件访问方式，NAS 可以被自动发现并直接用 Finder 访问。Web 端的 File Station 与 [Transmit](https://panic.com/transmit/) 等 WebDAV 客户端也可以访问 NAS，使用 WebDAV 客户端有一个好处是当需要在不同的顶级共享文件夹（非加密）之间移动文件时可以快速完成。

iOS 上有很多可以通过 SMB 或 WebDAV 协议访问 NAS 的 App，我目前使用的主要有 [Transmit for iOS](https://panic.com/transmit-ios/)、[FileBrowser](https://www.stratospherix.com/products/filebrowser/) 和 Readdle 的 [Documents](https://readdle.com/products/documents)。其中 Documents 有较好的文档浏览功能（结合 [PDF Expert](https://pdfexpert.com/)）；Transmit 适合于移动文件、上传下载和与其他服务器传输。

![](/images/2017/10/1*d0phGEtRz-J6lBcUUUm0aw.png)

iOS 11 提供了 File Provider extension，可以直接在原生文件应用管理云端文件，并可直接在第三方 App 打开和保存；Drag & Drop 功能也可以使文件方便地在不同 App 间通信。近日 FileBrowser 的更新为 Files 和 Drag & Drop 提供了完整的支持，所以 FileBrowser 目前是我主要使用的 NAS 文件管理 App。FileBrowser 也有 [Apple TV 版本](https://www.stratospherix.com/products/filebrowsertv/)，可以浏览图片、播放音频和视频（仅限 tvOS 直接支持的格式）。

值得一提的是移动平台的 DS file（以及 Web 端 File Station）有一些独有的功能，比如在服务器端文件解压，使用其他工具都需要将压缩包下载到客户端解压后再上传，DS file 可以直接在 NAS 上完成；以及在加密文件夹直接移动文件等需要耗时的操作，使用 Synology 官方的工具会比较方便。

另外，包括 [Omni](https://www.omnigroup.com/omnipresence) 系列产品、[DEVONthink](http://www.devontechnologies.com/products/devonthink/)、iWork 套件、 [Notability](http://gingerlabs.com/) 等 App 都提供了 WebDAV 的同步、访问或备份功能，可以直接将这些应用的数据存储到 NAS 上。（这里有一个不解是，Apple 在 iWork 应用中提供了在 Document Browser 浏览 WebDAV 服务器的功能，为什么不直接把它放到 Files App 中呢）

### 视频存储

家用 NAS 很大的一个用途是视频管理。Synology 提供了 Video Station 管理视频，不过 [Plex](https://www.plex.tv/) 在全平台（iOS / Android / Windows UWP / Apple TV / Web / macOS / Windows）提供了更好的体验。

![](/images/2017/10/1*dXKZN_9xF2JlGeHrNEAFyw.png)

电影和电视节目类可以自动匹配的视频文件，我会采取和 iTunes 一致的文件夹/文件命名规则保存（例如`/video/电视节目/プリンセス・プリンシパル/Season 1/08 case20 Ripper Dipper.mp4`）。

我有很多动画与音乐 Blu-ray 和 DVD 光盘。入手光盘后，我首先用 [Aurora Mac Blu-ray Copy](http://www.bluray-player-software.com/mac-bluray-dvd-copy.htm) 将光盘存档为 ISO 文件存储到 NAS 中（DVD 则用 [MDRP](https://www.macdvdripperpro.com/)），然后利用外出的时间用 [Handbrake](https://handbrake.fr/nightly.php) 转码为 HEVC（需要使用 nightly 版本以更好兼容 High Sierra 与 iOS/tvOS 11），在 iOS 11 发布前视频是转码为 H.264。目前 Video Station 和 Plex 均未支持在 iOS/tvOS 11 直接播放 HEVC，Plex 已确认正在进行相关开发，目前可以用 [nPlayer](https://nplayer.com/)（iOS）或 [Infuse](https://firecore.com/infuse)（iOS/tvOS）播放 HEVC 视频文件。

视频转码是一个比较纠结的问题，我的 MacBook Pro 2016 的 Skylake CPU 与 Radeon Pro 460 均支持硬件 H.264/HEVC 编码。然而 Handbrake 在 macOS 上并不支持硬件编码（有一个 Handbrake 的 [fork](https://github.com/galad87/HandBrake/tree/videotoolbox) 支持 macOS 上 H.264 的硬件转码，但不支持内嵌字幕和 HEVC）；而在 Windows 上，Handbrake 虽然支持 Intel Quick Sync，但 Boot Camp 屏蔽了集成显卡，而 Handbrake 目前[并不支持](https://github.com/HandBrake/HandBrake/issues/697) AMD VCE 硬件编码，我尚未找到同时支持 Blu-ray 和 AMD VCE 的转码工具。希望这方面有研究的同学能有更好的方案分享。

另外，我曾将在 iTunes 购买的影片和电视节目用虚拟机中的 iTunes 10.7 与 Requirem 将 Fairplay 去除再保存到 NAS 中（因此曾在中国区买过的 iTunes 影片得以保留）；目前 Apple 已禁止低版本 iTunes 下载 1080p 影片。

对于不属于电影和电视节目系列等可以自动匹配的视频文件，我没有放到 Video Station 和 Plex 自动索引的文件夹中，而是用单独的文件夹手工管理，在 iOS 设备用 nPlayer 播放，Apple TV 用 [VLC](https://www.videolan.org/vlc/download-appletv.html) 或 FileBrowser 播放。

值得一提的是 DS916+ 使用的 CPU 为 Intel Pentium N3710，支持 Intel Quick Sync 硬件编解码 H.264 与 HEVC（8bit）。除了 Synology 官方的 Video Station 支持硬件转码外，Plex Media Server（1.9.1 以上版本）也向 Plex Pass 用户提供了硬件转码支持，可以在服务器配置中开启。然而实际使用来看，硬件转码还存在一些问题，譬如 Video Station 不支持 Hi10P 和 10-bit HEVC 视频的硬件转码，Plex 开启硬件转码后，播放和拖动进度需要等待的时间特别长等。

### 音乐存储

作为 Anisong 爱好者会有大量音乐收藏。得益于 [Steve Jobs 的贡献](https://web.archive.org/web/20080107121341/http://www.apple.com/hotnews/thoughtsonmusic/)，在多数情况下购买音乐都不具有 DRM。对于购买的 CD，我会用 iTunes 抓取为 Apple Lossless 格式存储到 NAS 中，在 iTunes 购买的 AAC 音乐，则直接复制到 NAS 中。

![](/images/2017/10/1*-fEq5Y28Mwb2HP8JmIpTTA.png)

Synology 提供了 Audio Station 管理音乐。由于 App 体验和缺少 Apple TV App 的原因，目前我主要用 Plex 管理和播放音乐。不过 Audio Station 有一个很好的特性是可以在客户端离线时，通过 AirPlay 或 USB 在家中播放。

偶尔我会使用 USB 声卡将音箱和 NAS 连接，除了 Audio Station 支持直接通过外置音箱播放外，我还在 Docker 中安装了 [shairport-sync](https://github.com/kevineye/docker-shairport-sync)，可以将 NAS 作为 AirPlay 播放设备，这样可以直接将 iOS 设备播放的音频输出到 NAS 连接的音箱。

### 图片存储

Synology 提供了 Photo Station 管理图片，并支持自动创建缩略图、相册和自动从移动设备备份照片。不过功能的完善程度以及与操作系统的集成无法与 iCloud Photo Library 相比，所以我主要的照片存储工具仍然是 iCloud Photo Library，NAS 仅作为另一个备份。

![](/images/2017/10/1*3x8g-7nmWs8PUYCEI1HbJw.png)

然而由于 NAS 相对大的存储空间，对于来源不是 iOS 设备的图片，比如收藏的壁纸、CG 图、CD 与 Blu-ray booklet 扫描等较大体积的图片资源，我会只存在 NAS 中，在 iOS/tvOS 设备上通过 DS photo 浏览。另外，即将推出的 Synology Moments 还会提供人脸、位置识别等功能。

iOS 11 / A10+ 默认使用新的 HEIC 格式存储图片，遗憾的是 Photo Station 并不支持管理 HEIC 图片，DS photo 近日的更新中针对 iOS 11 的图片备份也会自动将 HEIC 转码为 JPG，这样不仅浪费存储空间，也会损失图片质量。如果只用 NAS 存储图片而不使用 Photo Station 的话，也可以 DS file 的图片备份功能，DS file 可以选择是否将 HEIC 转码为 JPG。

对于收藏的漫画，我会按章节或书册压缩为 zip 文件，然后用 [ComicGlass](http://comicglass.net/) 通过 WebDAV 串流阅读。

### 下载

Synology 的 Download Station 内置 HTTP/BitTorrent 等下载可以基本满足下载资源需求；除此之外，我通过 Docker 安装了 [aira2](https://github.com/hobbsAU/docker-aria2)，用于直接通过浏览器插件下载需要 Cookies 验证的内容。

![](/images/2017/10/1*JYgqSIgUZschwOCX2D8Eiw.png)

另外，使用 [youtube-dl-server](https://github.com/manbearwiz/youtube-dl-server)，结合 [Workflow](https://workflow.is/)，可以方便将视频网站的视频直接下载到 NAS 中。

### 智能控制

Synology 提供了可以用于视频监控的 Surveillance Station。我使用了 Foscam HD816P 作为 Surveillance Station 的摄像头。除了在指定时间进行动作检测、录像和推送通知外，新版的 Surveillance Station 还提供了便于家用的 Home Mode，可以直接根据 DS cam 应用的 Geo-fencing 功能自动切换监控设置，比如只有在离开家时才打开动作侦测和推送。

![](/images/2017/10/1*Vz9G9_4HmJ9EeZbtTWdArw.png)

很多家用设备可以利用 [Homebridge](https://github.com/marcoraddatz/homebridge-docker) 来支持 HomeKit，NAS 可以代替 Raspberry Pi 在 Docker 中安装 Homebridge。目前我在卧室安装了 Yeelight 彩光灯泡，通过 Homebridge 可以实现在所有 iOS 设备控制。同时，由于 Apple TV 可以作为 HomeKit 中心，在 iOS 的家庭应用中也可创建计划自动控制智能设备。

### 开发

DS916+ 的性能能够满足很多小型开发的需求，Synology 提供的 Docker 也非常适合开发、部署和测试。

我在 NAS 上安装了 [gogs](https://gogs.io) 作为 self-hosted Git 服务，相比 GitLab 占用资源要小很多，并且能够满足绝大多数需求。个人的代码和一些服务的配置文件都放在这个 Git 服务中。另外，Docker 中还分别安装了 redis、PostgreSQL 等容器作为其他应用的依赖。

在 iPad 上写代码是很多 iPad 用户的梦想，有一台可以长期访问的主机为这样的梦想提供了可能性。[Working Copy](https://workingcopyapp.com/) 和 [Textastic](https://www.textasticapp.com/) 已经可以在 iOS 上管理 Git 仓库和编写代码；我在 Docker 中配置了一个用于 nodejs 开发的容器，容器中安装了 ssh、zsh、git、vim 等工具，使用 [Prompt](https://panic.com/prompt/) 连接后即可进行相应的调试。

### 互联网

作为一台本地 Linux 主机，NAS 可以间接满足 Apple TV 和游戏机等不具备 Network Extension 的设备连接互联网的需求。我用的是 [MEOW](https://github.com/netheril96/MEOW)，运行在一个单独的 Docker 容器中。虽然 Apple TV 没有直接设置 Proxy Server 的 UI，不过可以通过 USB-C 接口连接 Mac 并使用 Apple Configurator 进行配置（Apple TV 4K 可以通过本地网络配置）。

在 Nintendo Wi-Fi Connection 关闭之前，有时我会用 Nintendo DS 连接网络，不过 DS 只支持 WEP 连接，无法直接连接家中的 WPA2 网络。NAS 只要插入一个 USB 无线网卡，并在 DSM 中进行一次简单的配置，即可临时创建一个不安全的 Wi-Fi 网络，当不需要时拔掉网卡即可恢复网络安全性。

## 备份

Synology 提供了 Hyper Backup、Glacier Backup、Cloud Sync 等备份或同步方案。根据 3-2-1 备份原则，NAS 中的重要数据我会在本地和远端各有一份备份。

本地的备份使用了 3 块被升级替换的 2TB 硬盘，备份时将硬盘通过 USB-C 硬盘盒连接到 Mac，然后分别使用 [ChronoSync](https://www.econtechnologies.com/chronosync/overview.html) 进行增量同步（同类工具还有 GoodSync 或 Carbon Copy Cloner）；NAS 中加密文件夹的内容会备份到加密 HFS+ 分区，其他内容则会备份到 exFAT 分区。

Synology NAS 也可以直接连接 USB 3.0 外置驱动器，并提供了收费的 exFAT 分区支持。考虑到操作方便、便于直接浏览、以及 802.11ac 网络速度和直接连接硬盘的速度相差不大的原因还是使用了 Mac 进行备份。

远程备份使用了两种方案。对于对安全性要求高且占用空间并不大的数据（例如图片、音乐、Git 仓库），每周会通过 Hyper Backup 增量备份到 Amazon S3；对于整理好的视频文件、购买的 DRM free 游戏等，则会用 Cloud Sync 单向同步到比较廉价的 [Backblaze B2](https://www.backblaze.com/b2/partner-synology.html) 存储（目前 Hyper Backup 尚不支持 Backblaze B2，使用单向同步可以避免远程的误操作误删文件）。其他诸如 Blu-ray ISO 由于已经是其他存储媒介的备份，且占用空间极大没有做重复的备份。由于其过于复杂的计费规则和取回方式，个人不推荐使用 Glacier Backup。

至于 Mac 的 Time Machine，我是使用了一块升级替换的硬盘通过 USB-C 硬盘盒连接到 Mac 备份，而没有用 NAS 作为 Time Machine 的存储。原因主要是对目前通信方案的担忧（AFP 协议已被 Apple 弃用，目前版本的 Samba 尚未完全支持 Apple 的 Time Machine over SMB 标准），曾经使用 NAS 作为 Time Machine 存储时也发生过几次 Time Machine 需要重建的经历。另外将 Time Machine 存储到 RAID 中也有空间浪费和频繁的磁盘读写，Accidental Tech Podcast 曾[提到](https://www.caseyliss.com/2017/2/11/nas-for-n00bs)他们的 Time Machine 存储在 NAS 单独的未做冗余的卷中，也是一个不错的方案。

另外，52Poké 的数据，除每日备份到 Amazon S3 外，也会每周使用 rsync 脚本备份快照到这台 NAS 中。

## 安全

对 NAS 来说，安全的重要性不言而喻。Synology 也提供了安全审计功能可以进行基本的检查。除此之外，还有一些需要注意的点：

- 保持最新的 DSM 和套件版本
- 使用唯一的强密码
- 尽量将文件存储在加密的文件夹
- 所有第三方应用（不在官方应用套件市场的应用）使用 Docker 安装，并最小化开放的权限和文件夹
-  关闭 SSH 的密码校验，每个连接设备/应用使用单独的 Private Key
- 在配置外部访问时，务必不要将任何未经加密的端口暴露在公网
- 开启两步验证

其中非常重要的是避免将未经 TLS 或 SSH 加密的端口暴露于公网，尤其是经常使用的 WebDAV 等服务，第三方 App 如 Plex 也尽量开启「只允许加密连接」等选项。未经加密的连接意味着 ISP 或开放 Wi-Fi 等可以轻易拿到 NAS 账号与密码，在安全环境日益恶化的情况下是非常危险的。

## 电源

使用 UPS 备用电源对 NAS 来说是必要的，我使用的是 APC BX650CI。为 NAS 选择备用电源建议选择支持 USB 接口连接的产品，这样当断电时，NAS 能收到消息，并通过 Push 推送通知使用者和在电量较低时自动关机。

## 不足

目前这台 NAS 比较大的遗憾是，由于不便重建已用 9TB 的 Volume，未能享用 Synology DSM 支持的 btrfs 文件系统的优势，也因此无法使用 Virtual Machine Manager 创建虚拟机。希望有一天，btrfs 能像 Apple 的 APFS 一样提供从 ext4 安全转换的方案。

这里也简单提一下对 Synology 的吐槽。iOS 9 发布已超过两年，而目前很多 Synology 第一方 iOS 应用都尚未支持 Split View、Picture in Picture 和 iPad Pro 屏幕，至于 iOS 11 的 Files 和 Drag & Drop 支持可能更是遥遥无期。而这些 iOS 特性，对于生产力工具的 NAS 应用而言至关重要。

## 总结

「云」的存在是今天数字生活的重要部分，由于设备和时间的碎片化，我们对本地存储需求有种日渐式微的错觉。然而「云」本身是不稳定的存在，无论是商业公司间版权纠纷的「大人的事情」，还是随时发生的不可抗力都会让原本可用的比特瞬间消失，甚至赖以生存的真正互联网是否能一直连通都是个巨大的问号。于是在触手可及的物理空间拥有数 TB 的存储，相对永久地保存一些东西，是一个能够带来哪怕很微弱的安全感的重要存在。
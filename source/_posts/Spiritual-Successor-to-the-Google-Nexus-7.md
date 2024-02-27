---
title: Spiritual Successor to the Google Nexus 7
date: 2024-02-28 01:48:05
tags:
---

![Lenovo Legion Y700](/images/2024/02/lenovo-legion-y700.jpg)

The [Google Nexus 7](https://en.wikipedia.org/wiki/Nexus_7_(2012)), released in 2012, is the first "small tablet computer" I can recall. It featured a pleasing 800p display, a powerful processor for its time, and shipped with a "stock Android" system. I used a Nexus 7 for a few years alongside an iPad Mini, which was subsequently replaced by a larger iPad Air 2. Although the device has not been with me for many years, the memories of reading manga on a perfectly sized device and the hackable Android experience, including running a bash shell and emulators, always lead me to seek the spiritual successor to the Google Nexus 7.

For the past two years, I have been using the [Lenovo Legion Y700 (2022)](https://www.gsmarena.com/lenovo_legion_y700-11394.php) as my primary device for content consumption. It comes equipped with a Snapdragon 870 processor, 256GB of storage, 12GB of RAM, and an 8.8-inch 120Hz 2K display. Similar to the Google Nexus 7, there is an improved "2023" version featuring a Snapdragon 8 Gen 1 processor. However, the older 2022 model suffices for my needs, and I prefer its *advanced* 3.5mm audio port.

While the hardware performance is excellent and the freedom to install apps from various sources—such as Google Play, [F-Droid](https://f-droid.org/), GitHub, or directly from the developer's website—*feels right*, I have never felt good about its ZUI operating system or any Android OEM system. I appreciate that Lenovo doesn't include too much bloatware, doesn't require me to log in to its account, and natively supports Google Play Services, but there are always moments when I encounter buggy or peculiar issues with some apps, or something just doesn't seem right with the OS.

On the other side, for the past two years, a [Google Pixel 6a](https://en.wikipedia.org/wiki/Pixel_6a) installed with [GrapheneOS](https://grapheneos.org/) has been my secondary phone. While the hardware is decent, it kind of underperforms when compared to an iPhone or a Snapdragon 8-equipped Android device. However, the open-source operating system is more than just great. It offers many secure features, and even Google Play Services can be run in a sandbox to protect privacy and battery life. I can disable network access for Google Camera, Photos, and Gboard while still keeping their on-device ML features. Additionally, I can place some apps that I don't trust as much in a Work Profile with [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/), making other apps and data invisible to these apps.

In the end, I learned that the bootloader of the Lenovo tablet can be unlocked, and I discovered [Project Treble](https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html) and the Generic System Image (GSI), which enable the availability of custom Android distributions on most devices without excessive difficulties. Weeks ago, I followed [this video](https://www.youtube.com/watch?v=zQ0Guo1v9LA) and installed [crDroid](https://crdroid.net/) on my Lenovo Legion Y700.

crDroid, a fork of LineageOS, offers a pure and customizable Android experience. After experimenting with it for a few hours, I deeply regret not replacing the OS on this tablet sooner. Using an open-source stock-like Android system is incredibly refreshing. The UI is smooth, and I can truly appreciate the 120fps screen while navigating. It brings back memories from more than a decade ago with the Google Nexus 7, making me realize that I'm holding what could be considered the **spiritual successor to the Google Nexus 7**.

## System Experience

As is common with most custom images lacking official support, there are a few caveats when using a GSI ROM on this tablet, but I can say that I have *fewer* issues with crDroid than with the stock ZUI.

The settings and issues worth noting are:

- 120fps can be enabled under Settings > Phh Treble Settings > Misc features > Force FPS, by setting it to 1600x2560@120.00001.
- Lock screen rotation can be activated by going to Settings, searching for "rotation," and selecting "Rotate lock screen." I also enabled all rotation modes here.
- The 3.5mm audio port does not work initially, but it can be fixed under Settings > Phh Treble Settings > Qualcomm features > "Use alternate audio policy."
- The double-tap to wake feature is not operational yet, but, surprisingly, the Lenovo screen cover lock/unlock feature does work.
- Adaptive brightness does not work.
- Changing Wallpaper crashes initially, which is fixed by installing [Fossify Gallery](https://github.com/FossifyOrg/Gallery).

The crDroid launcher is a lightweight fork of the Google Pixel launcher. Initially, I preferred it as it is similar to the launcher used in GrapheneOS, so I was already accustomed to it. However, there is an issue where the background of the app drawer remains dark even when using the light theme, which may be due to some compatibility issues with the tablet size or the enabling of the work profile. As a result, I switched to [Niagara Launcher](https://niagaralauncher.app), and it looks perfect.

I also learned a valuable lesson: Unlike Pixel phones, Lenovo does not allow the re-locking of the bootloader once a non-stock OS is installed. The first action I took after installing [crDroid_gsi](https://github.com/naz664/crDroid_gsi) was attempting to re-lock the bootloader. Subsequently, the tablet became bricked, displaying a message that the system was corrupted and could not boot. Thankfully, the tablet could be unbricked by following [this guide](https://xdaforums.com/t/guide-unbrick-lenovo-y700-tablet.4509297/).

## Privacy and Security

In terms of security, I'm content with the basic Android security model, but it's important to note that the tablet is less secure than a Pixel equipped with GrapheneOS.

Keeping the bootloader unlocked is clearly a security risk, as theoretically, a thief with hardware access could install a hacked ROM to decrypt data on the device. Additionally, the face recognition feature on this device is less secure than Apple's Face ID or the face unlock feature on the Pixel 8, meaning a thief could theoretically mimic my face to unlock this device.

I do not consider a tech-savvy thief attempting to access my data to be within my threat model. Nonetheless, I choose not to store sensitive data on this tablet, and I also disabled biometric unlock in [Bitwarden](https://bitwarden.com/) after setting up most of my apps.

While crDroid does not come with sandboxed Google Play Services like GrapheneOS does, disabling the advertising ID, personalization, autofill, and location settings is sufficient for my privacy needs regarding Google.

One theoretical privacy threat when using mobile devices is the possibility of manufacturers or popular apps harvesting the list of installed apps on the device and potentially sharing this information with authorities, which could result in phone calls from "anti-fraud offices" warning about the risks of certain apps. While this is all theoretical and without neither any evidence nor my own experience, using an open-source system can definitely mitigate such threats. Similar to my setup on my Pixel phone, I use Shelter to isolate certain apps within a Work Profile.

## Apps

Despite it being over a decade since the launch of Nexus 7, there are still not many Android apps optimized for tablet size. However, since Android does not restrict non-optimized apps to run in a centered window like the iPad, most Android apps function adequately on this smaller tablet. Additionally, the operating system supports basic multitasking features, such as split-screen.

I prefer to install apps from [Neo Store](https://github.com/NeoApplications/Neo-Store) when possible, which is a frontend for F-Droid and also supports [IzzyOnDroid](https://apt.izzysoft.de/fdroid/) by default. For apps that are only available through GitHub releases, I can update them automatically using [Obtainium](https://github.com/ImranR98/Obtainium).

Here is a list of apps worth mentioning on this tablet:

- **[Cromite](https://github.com/uazo/cromite)**: The default browser, featuring built-in ad blocking and privacy enhancements.
- **[DAVx5](https://www.davx5.com/) and [Etar](https://github.com/Etar-Group/Etar-Calendar)**: Used for syncing calendars with Nextcloud.
- **[FocusReader](https://play.google.com/store/apps/details?id=allen.town.focus.reader)**: An RSS client connecting to [Miniflux](https://github.com/miniflux/v2).
- **[GitNex](https://gitnex.com/)**: A client for [Forgejo](https://forgejo.org).
- **[Material Files](https://github.com/zhanghai/MaterialFiles)**: A file manager supporting SMB.
- **[Mihon](https://github.com/mihonapp/mihon)**: A manga reader and [Komga](https://github.com/gotson/komga) client.
- **[Moe Memos](https://github.com/mudkipme/MoeMemosAndroid)**: A note-taking app developed by me.
- **[MX Player Pro](https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.pro)**: Used for watching local videos not in my Plex library.
- **[NewPipe](https://github.com/TeamNewPipe/NewPipe)**: Considered the best YouTube client.
- **[Play Books](https://play.google.com/store/apps/details?id=com.google.android.apps.books)**: Used for reading ePub books, chosen for its page-turn animation.
- **[Plex](https://play.google.com/store/apps/details?id=com.plexapp.android) and [Plexamp](https://play.google.com/store/apps/details?id=tv.plex.labs.plexamp)**: My primary media players.
- **[Squawker](https://github.com/j-fbriere/squawker)**: Used to subscribe to voice actors from the former birdsite.
- **[Stealth](https://f-droid.org/en/packages/com.cosmos.unreddit/)**: A Reddit client.
- **[Tasks.org](https://tasks.org/)**: For to-do lists syncing with Nextcloud.
- [Termux](https://termux.dev/): A powerful terminal emulator.
- **[Transdroid](https://github.com/erickok/transdroid)**: Used to manage my qBittorrent server.
- **[Tusky](https://tusky.app/)**: A Mastodon client.
- **[Zoo for Zotero](https://play.google.com/store/apps/details?id=com.mickstarify.zooforzotero)**: For reading from my PDF library.

## Gaming

The Lenovo Legion Y700 is marketed as a "gaming tablet." Although I am not a mobile gamer—since most modern mobile games adopt a freemium, casino-like business model that I feel detracts from the concept of video games as works of art—Android remains an excellent platform for emulation and game streaming. This tablet has the capability to emulate [PS2](https://github.com/Trixarian/NetherSX2-classic) and [Wii](https://play.google.com/store/apps/details?id=org.dolphinemu.dolphinemu) games at full speed with upscaled textures, as well as stream PC games via [Moonlight](https://github.com/moonlight-stream/moonlight-android), or PS5 games using [PSPlay](https://play.google.com/store/apps/details?id=psplay.grill.com) or [Chiaki](https://sr.ht/~thestr4ng3r/chiaki/), all with negligible latency.

Gaming on Android devices represents a larger story for me, but it's not particularly tied to this tablet or the Pixel phone. I'm keeping it a secret for now and may discuss it in more detail in the future.

## Conclusion

The journey to find the spiritual successor to the Google Nexus 7 led me to the Lenovo Legion Y700, a device that, while initially not perfect due to its ZUI operating system, transformed into a nearly ideal tablet experience after installing crDroid. This shift back to a stock-like Android experience reminiscent of the Nexus 7 days has been both nostalgic and enlightening, proving that the essence of a great tablet is not just in its hardware but in the freedom and flexibility of its software. The Lenovo Legion Y700, with its powerful specs and the newfound joy of a pure Android experience, serves as a testament to the enduring appeal of customizable, user-centric technology. It reminds us that sometimes, the true successor to a beloved piece of technology is not about finding an identical replacement, but about recapturing the spirit of innovation and openness that made the original so special.
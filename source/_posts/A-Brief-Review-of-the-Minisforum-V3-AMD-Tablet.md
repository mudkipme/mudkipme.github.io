---
title: A Brief Review of the Minisforum V3 AMD Tablet
date: 2024-04-14 15:00:35
tags:
---

![Minisforum V3 AMD Tablet](/images/2024/04/v3-1.jpg)

_**Update:** I have created an [awesome-minisforum-v3](https://github.com/mudkipme/awesome-minisforum-v3) GitHub repository to list information for Minisforum V3 users, including some workarounds for the issues mentioned in this review._

---

## Quest for the Ideal Portable Linux Device

After my 2016 MacBook Pro experienced multiple hardware issues and was sent for recycling, I no longer have a personal laptop. Until recently, if I wish to do some programming in a coffee shop or during a family trip, my only options are the corporate-provisioned MacBook or my iPad Pro 2020, neither of which is ideal. I had hoped the iPad Pro could be more productive and tried various setups involving [code-server](https://github.com/coder/code-server) and remote development, but I encountered many limitations. Furthermore, the fact that Apple has restricted iPadOS, preventing me from installing any software I want, has become increasingly uncomfortable for me in light of the recent [Digital Markets Act](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/) and [antitrust](https://www.theverge.com/2024/3/21/24105363/apple-doj-monopoly-lawsuit) discussions.

I adore the form factor of the iPad Pro as a travel computer, and the concept of a [MacPad](https://www.macstories.net/stories/macpad-how-i-created-the-hybrid-mac-ipad-laptop-and-tablet-that-apple-wont-make/) is indeed extraordinary. However, I'm hesitant to invest significant time and money into a custom product that might not have the bless of its manufacturer. Additionally, memories of the Microsoft Surface have resurfaced. I owned a Surface 3 many years ago but sold it due to its performance not meeting my needs, eventually replacing it with a Hades Canyon mini PC.

As I've become more immersed in Linux, both through my [Homelab VMs](https://mudkip.me/2024/01/31/My-2023-Homelab-Setup/) and my [desktop PC](https://mudkip.me/2024/03/28/Notes-on-EndeavourOS/), the idea of owning a portable Linux device appeals to me. However, I must confess that I'm not fond of the design of most mainstream non-Apple laptops, and Linux-friendly laptop brands like Framework, System76, and Starlabs are not yet available in my region. I've experimented with Asahi Linux on my iMac, and while it offers a generally great experience, the ARM Linux ecosystem, especially with 16K pages, doesn't quite meet my daily needs.

Ultimately, I'm in search of a Surface-like device that offers good performance, runs Linux well, and is ultraportable. Although the Surface Pro 10 was released just as I began my search, Microsoft's pricing strategy—essentially doubling the price of the whole device for adequate RAM and SSD—is unacceptable to me. It seems Microsoft has taken the wrong lessons from Apple in this regard, and I believe such pricing strategies should be considered unethical.

## Discovering the V3 Tablet

During my search, I discovered an intriguing product from Minisforum, a manufacturer renowned for creating NUC-like mini PCs, which has gained popularity within the Homelab community. The tablet, named "[V3](https://www.minisforum.com/page/v3/index.html)," has been in development for over a year. Initially, it was developed by another manufacturer with an AMD Ryzen 7 6800U processor. Later, Minisforum took over the project, replacing the processor first with the 7840U, and ultimately with the 8840U in the final product.

The tablet features a 14" 2.5K 165Hz P3 color touch screen, a 50.82Wh battery, four speakers, front and rear cameras, and face and fingerprint unlocking, along with two USB4 ports. Surprisingly, it also features a USB-C port labeled "VLink" or "DP-in," enabling the tablet to function as an external display for other devices. This is a feature I've long believed [should be standard on all screens](https://indieweb.social/@mudkip/112041394562007832) and regret its absence in recent iMacs. My curiosity was piqued about how Linux would perform on this device.

The tablet was released on March 29 locally, and its price was set at 6999 CNY (~968 USD) for the configuration with 32GB DDR5 RAM and a 1TB SSD—a price point I consider quite reasonable. Early buyers were offered a keyboard case at no extra cost and had the opportunity to purchase the MPP 2.0 stylus for just 200 CNY (~28 USD). Moreover, it was [mentioned](https://www.bilibili.com/video/BV1bf421o7Qa/?t=1417) that Linux runs on this tablet, with support for Ubuntu 22.04 and 23.10, albeit with "only a few minor issues" that are currently being addressed. I placed my order on day one and have been playing with it over the past few weeks.

## Initial Experience

My first impressions of the V3 tablet were less than ideal, primarily due to Minisforum's approach to selling and shipping the initial units. Although the kickstand and keyboard case were offered for free to early buyers, there was a catch: they were shipped *after* leaving a review on the online retailer JD. The absence of both the kickstand and the keyboard significantly detracted from the user experience. Additionally, a bug in Windows 11 prevented me from creating a PIN code to complete the setup, a problem that could only be resolved by connecting a USB keyboard. Placing the tablet on a table without the kickstand led to the air opening on the back being covered, which is far from ideal for airflow.

I believe that shipping the free kickstand and keyboard with the tablet would lead to more positive reviews by significantly improving initial customer satisfaction. I hope global customers won't have to wait for the kickstand, keyboard, and stylus to be shipped separately, as international shipping could add to the frustration.

The V3 tablet comes with Windows 11 Pro, a detail I find quite welcoming, even I primarily intend to use Linux desktop on this device, as most laptops in this price range only come with the Home edition of Windows. The Pro edition grants users more control over BitLocker encryption, which is crucial for a portable device. Additionally, Hyper-V is important for those who need to install VMs on Windows.

The screen's color and brightness are exceptional. Initially, I didn't anticipate the 165Hz refresh rate to be a significant feature for this tablet, assuming that most games would struggle to run at 2K on the integrated GPU and that I didn't have any videos exceeding 60Hz to watch. However, the difference in UI smoothness between 60Hz and 165Hz is stark, making it hard for me to revert to the lower refresh rate.

It's somewhat disappointing that the tablet's resolution is only 2.5K; at this screen size, I believe 2.8K or 3K would be optimal for 200% integer scaling. Nonetheless, given that KDE and Wayland now adequately support fractional scaling at 175% and the AMD GPU has good Wayland compatibility, this resolution is acceptable. Consequently, content on the V3 tablet appears as sharp as on MacBooks other than 14 and 16 inch MacBook Pro, which has 254 pixels per inch.

## Linux on the Device

Unlike my desktop PC, which runs EndeavourOS, I chose Fedora KDE for this tablet. My preference for Fedora stems from its relatively newer kernel and desktop environment, as well as its out-of-the-box support for secure boot. The latter is particularly crucial for a portable computer, allowing me to enable full disk encryption and set up automatic decryption via TPM with `systemd-cryptsetup`. My choice to stick with KDE was primarily due to its [excellent support](https://pointieststick.com/2022/06/17/this-week-in-kde-non-blurry-xwayland-apps/) for scaling Xwayland applications. Although many GTK4 apps appeal to me—and I can still use them within KDE—GNOME has continued to [refuse](https://discourse.gnome.org/t/xwayland-fractional-scaling-like-in-kde/17617) [to address](https://discourse.gnome.org/t/any-news-on-fixing-xwaylands-blurry-fractional-scaling/18163) the issue of Xwayland apps appearing blurry on HiDPI displays.

I was concerned about hardware support on Linux, but my experience turned out to be reassuring. The touchscreen, keyboard, touchpad, Wi-Fi, USB, Bluetooth and suspend/sleep all work without any issues. It's surprising that the fingerprint reader on the power button works right out of the box. After adding my fingerprint in KDE settings, not only can I use it on the lock screen, but I can also use my fingerprint to unlock `sudo` commands in Konsole with no extra setup. Both the front-facing and back cameras work well. I didn't try face unlocking because I actually prefer using touch over face recognition.

Most apps I installed on V3 are similar to those on my desktop PC, only I use `dnf` instead of `pacman`. I don't need to configure Wayland for Chromium and Electron apps, as Xwayland performs well with an AMD GPU. I couldn't get Timeshift working with a btrfs filesystem inside a LUKS partition, so I switched to `btrfs-assistant` and `snapper` for automatically creating snapshots.

Enabling hardware acceleration for video playback in Fedora is somewhat weird. I need to add the RPMFusion repository and switch from `mesa-va-drivers` to `mesa-va-drivers-freeworld` to enable H.264 and HEVC hardware decoding, due to some absurd patent law issues.

## Using the V3 as a Linux Tablet

![KDE Tablet Mode and Handwritten Notes in Xournal++](/images/2024/04/v3-2.jpg)

Using Linux with a touchscreen is as good as using Windows. I've used the desktop mode on the Steam Deck, and all the gestures are familiar. KDE has a "tablet mode" that enlarges the taskbar icons and many UI elements when I detach the keyboard, making it easier to tap.

The stylus is well-supported on Linux. Hover and pen pressure functionalities work great in apps like [Krita](https://krita.org/) and [Xournal++](https://xournalpp.github.io/). It's a pleasure to take handwritten notes and annotate PDFs on this tablet, especially with the 165Hz refresh rate. Using the stylus makes selecting text and navigating the UI easier than using my finger.

The on-screen keyboard is a bit tricky here. Both [Fcitx5](https://fcitx-im.org) and [Maliit](https://maliit.github.io/) use the virtual keyboard protocol on KDE Wayland. When the keyboard is attached, I use Fcitx5 for inputting Chinese or Japanese texts, and when detached, I switch to Maliit for the on-screen keyboard. I haven't found a way to automatically switch between these two, but I believe it's possible. Maliit supports multiple languages and can be configured with `gsettings set org.maliit.keyboard.maliit enabled-languages "['en', 'zh-hans', 'ja', 'emoji']"`.

I use [Waydroid](https://waydro.id/) to run Android apps on the V3 tablet, with support for [Google Play](https://docs.waydro.id/faq/google-play-certification) and [arm translation](https://github.com/casualsnek/waydroid_script). Some apps, like Google Play Books and Pocket Casts, work great. However, the performance and experience don't compare to [a native Android tablet](https://mudkip.me/2024/02/28/Spiritual-Successor-to-the-Google-Nexus-7/). I considered using Microsoft OneNote as a cross-platform tool for my handwritten notes, but there's a major issue with OneNote for Android on Waydroid—the handwriting doesn't appear on the screen until I lift the stylus, touchpad, or finger. Another issue is video playback; while I have hardware acceleration in Linux apps like Firefox, mpv, and VLC, Android apps can only decode videos with the CPU, leading to worse battery life. Cameras do not work on Waydroid either.

One functionality missing in Linux on the V3 is automatic rotation. I have `iio-sensor-proxy` installed, and KDE Wayland should support automatic rotation out of the box. However, `monitor-sensors` reports there is no accelerometer. I hope Minisforum can address this issue with a driver or firmware update, or at least provide a DKMS module.

Another minor issue is that the volume keys on the side of the tablet only work when the keyboard is attached in Linux. I suspect this is a userland problem.

## Performance and Battery Life

![Watching Sound! Euphonium](/images/2024/04/v3-3.jpg)

The performance of the AMD Ryzen 7 8840U is outstanding. It outperforms my M1 iMac in tasks such as building Android apps and the `7z b` benchmark. Its single-core performance surpasses that of my Core i7 12700 homelab PC, though the 12700 only performs better in multi-core tasks because it has four more E-cores. I haven't conducted extensive benchmarks, and I haven't yet managed to get Handbrake working with AMD VCN on Linux to test its hardware-accelerated video encoding speed. However, the KDE UI and most applications feel as fast as my Dragon Canyon desktop PC equipped with an RTX 3080. In some cases, it feels even snappier, due to the ongoing issues between NVIDIA and Wayland, which are expected to be [resolved](https://zamundaaa.github.io/wayland/2024/04/05/explicit-sync.html) very soon.

During my normal usage in Linux, which includes web browsing with Firefox, video playback with Haruna Media Player (with `hwdec` set to `auto`), writing in Obsidian, and lightweight coding in Visual Studio Code and Android Studio, the tablet lasts for 6 hours. The battery life is not as long as that of Apple Silicon MacBooks but it is satisfactory to me and better than what I remember from using Intel MacBooks. The battery life might vary with Windows, potentially achieving longer duration.

Gaming on this tablet delivers performance in line with what you would expect from the Radeon 780M integrated GPU. I've tested it with two recent games I'm playing. I can play *Persona 3 Reload* at high settings (though with Ray-Traced Reflections disabled) at 1200p and 60fps. For *Like a Dragon: Infinite Wealth*, I achieve 55 to 60 fps at high settings (with FSR set to optimize for frame rate) in 1200p. Both games perform much better than on the Steam Deck. The frame rate only drops slightly when reducing the TDP from 28W to 15W, showcasing the efficiency of the GPU under varied power conditions.

The tablet is marketed as an "AI PC," due to the AMD Ryzen 7 8840U processor, which features an XDNA NPU, and a keyboard equipped with a Copilot key. While local Large Language Models like Llama 2 perform rapidly and effectively using platforms like [ollama](https://ollama.com/) and [LM Studio](https://lmstudio.ai/), I believe these currently run on the CPU. As of now, I am not aware of any AI products specifically utilizing the NPU, but AMD does provide [some tutorials](https://www.amd.com/en/developer/resources/ryzen-ai-software.html) which might hint at future developments that could leverage the NPU for enhanced AI performance.

## Working as an Portable Display

The external display feature of the V3 tablet, which makes it a "3 in 1" device, is unique. Although this feature is still in its early stages based on my testing, I believe it represents a promising start.

The VLink USB-C port only operates when the computer part of the tablet is shut down. Unfortunately, there appear to be compatibility issues, as it doesn't work with my M1 Macs using a USB-C cable. I tried two cables that function with my Mac and the LG UL850 display, but neither could activate the V3's display. However, it worked fine when connected to my desktop PC. I suspect that the issue might be resolved by using a USB-C to DisplayPort dongle and a DisplayPort to USB-C cable, but this solution is too cumbersome. I hope a firmware update can resolve this issue.

When used as an external display, the keyboard case can also function as an external USB keyboard. This is particularly useful in setups where I want to configure a NAS or mini PC for eventual headless operation. However, it seems the V3 only supports a 60Hz refresh rate when used as an external display, and I'm not sure if this is due to compatibility or cable issues.

Another feature I hope to see improved in the future is the ability to turn on the Nintendo Switch's TV mode with just one USB-C cable. I understand that Nintendo doesn't use standard display protocols, making this a challenging feature to implement. However, I'm aware of [portable displays](http://cforce.com.cn/html/Product/portable/) that support this feature. It would be incredibly valuable for travel with the Nintendo Switch, and I would be willing to pay extra for this capability.

## Other Hardware Details

The form factor of the V3 tablet is similar to a Microsoft Surface Pro, especially when the keyboard is attached. However, the kickstand is separate from the tablet, which makes the entire setup slightly heavier. I prefer the integrated kickstand design of the Microsoft Surface and Nintendo Switch OLED, but the separate kickstand does provide a wider range of angles.

The tablet is completely sealed with no visible screws for opening, which raises concerns about long-term repairability, especially if the cooling system degrades over time. While a 1TB SSD is sufficient for my needs with this device, it would be beneficial for users who require more storage if it can replace the NVMe drive.

The speaker is loud and good, but there seems to be an issue with volume control in Linux. The global volume control can only mute or unmute the speaker, while the actual volume is controlled at the application level. I suspect there might be some driver issues, as when I use headphones, both the global and application level volume controls work well.

The keyboard case is quite pleasant to use. While I might still prefer the feel of the Magic Keyboard, this one comes close. The key layout feels just right. I particularly appreciate that the keyboard includes dedicated Home, Pg Up, Pg Dn, and End keys on the right side. This is especially useful to me, as I'm primarily familiar with macOS/Emacs shortcuts for these commands, which are not supported in Linux except within the terminal.

The fan noise is a mixed bag for me. During the day, even under heavy workloads, I can barely hear the fan. However, at midnight, when my room is completely silent, I can often hear a strange, faint buzzing noise coming from the tablet. This noise disappears when I run benchmarks or play games that maximize the fan speed. It's not like the typical fan noise but resembles the sound of an HDD, though at a much lower volume. It seems this noise might be caused by the fan frequently changing speeds or being affected by the magnets in the tablet. I'd be interested to hear if others have experienced this issue, and if it turns out to be unique to my unit or an early production issue, I'll replace it under warranty.

## Conclusion

After two weeks of use, I consider the Minisforum V3 AMD Tablet to be a nearly perfect portable Linux device. It offers a promising blend of performance, versatility, and Linux compatibility at an acceptable price point. This tablet is an excellent start for tablets featuring AMD APUs and those that triple as external displays. However, I hope that the minor issues I've mentioned can be addressed, either through firmware updates or in the next iteration of the product. I also wish for some level of repairability, such as the ability for users to open the case to clean the fans or replace the NVMe drive. Looking ahead, I plan to bring the V3 tablet along for travel and weekends in coffee shops.
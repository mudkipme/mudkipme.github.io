---
title: Early 2026 Updates
date: 2026-02-26 02:35:04
tags:
---

The theme of late 2025 to 2026 is building small certainties in a reality of uncertainties.

## New DIY NAS

As Synology moves away from the consumer market, blocking 3rd party drives (though the decision was [reverted](https://www.tomshardware.com/pc-components/nas/synology-walks-back-controversial-compatibility-policy-for-2025-nas-units-third-party-hdd-and-ssd-support-returns-with-diskstation-manager-7-3-update)) and dropping support for hardware transcoding even when the hardware supports it, I have been planning to build a new NAS using open-source solutions. The global memory crisis since late 2025 reminded me of my spare 32GB of DDR4 SODIMMs, as well as the 56TB of HDDs from my [backup NAS](https://mudkip.me/2024/01/31/My-2023-Homelab-Setup/).

My rule for the new NAS was simple: it must support DDR4 RAM, and ideally support SODIMM and/or dual-channel (since I have two 16GB DDR4 SODIMMs). My initial choice was the Aoostar WTR Pro 5825U, which seemed like a perfect match. However, multiple users were worried about its power constraints. Because it doesn't support powering up the HDDs sequentially, the boot might fail if all 4 HDDs draw high wattage simultaneously. In the end, I settled on a custom build with a Topton Ryzen 7 5825U Motherboard, a Jonsbo N2 Case, and a Great Wall SFX PSU. I also sold the Synology DS916+ and recouped half of my upgrade expenses.

On the software side, I picked OpenMediaVault 8. The Web UI looks shabby compared to Synology but actually works quite well. Three of my drives were formatted with BTRFS and grouped as a [mergerfs](https://github.com/trapexit/mergerfs) pool, the other is used as a parity drive for [SnapRAID](https://www.snapraid.it/). The setup operates similarly to RAID5 but feels much easier and safer. Even if two disks develop bad sectors, I would only lose a small amount of data. The only catch is that I can no longer afford a new HDD if any of them die out of warranty due to skyrocketing prices.

Using OMV-Extras, it's easy to have containers and VMs managed right in the OpenMediaVault Web UI. I've also researched and settled on these Synology alternatives:

- [SFTPGo](https://github.com/drakkan/sftpgo) for WebDAV and SFTP access
- [Filebrowser](https://github.com/filebrowser/filebrowser) for managing files on the web (though I still miss remote unzipping with Synology File Station)
- [Kopia](https://github.com/kopia/kopia) for backups
- Aria2 and qBittorrent for downloading *Linux ISOs*
- Frigate NVR as a Surveillance Station alternative

I transferred my data using rsync from the DS1621+ and subsequently set up reverse rsync tasks to back up from the new NAS to the DS1621+. I named my new NAS "metagross.lan" for its massive storage size and computing power.

## Gaming Devices

I've reshuffled my handheld gaming devices again. They are now the Nintendo Switch 2, Steam Deck OLED, and Ayn Thor.

The dual-screen Ayn Thor looks stunning when playing DS and 3DS games with upgraded resolutions and textures. It can emulate every retro system, and many PC games run nicely with GameHub thanks to the development of FEX-Emu. Tinkering with the configurations, emulators, local streaming setups, and front-ends is fun and provides a sense of control.

Sometimes I regret not building a new PC in 2025 when I could still afford RAM and SSDs, but I appreciate my old 12th-Gen Intel build and the new AMD RX 9070 XT GPU every day. Thanks to developments in the Linux kernel, Mesa drivers, GE-Proton, vkd3d, and various other components, gaming performance gets noticeably better every few weeks. For the games I've been playing recently, it's easy to achieve a stable 100+ FPS at 4K maximum settings with FSR 4, even though I capped the GPU at a 70% power limit.

## Moe Memos

I finally took the time to finish the major upgrade to [Moe Memos](https://memos.moe) that I had been planning for over two years. It started out of frustration: slow loading times when I was away from home, the inability to use my own app when I was offline or having IPv6 connectivity issues, and all the minor headaches of aging code.

The new releases of both the iOS and Android versions can finally work offline and sync flawlessly (at least in my experience), and there are many improvements regarding attachments, Markdown support, widgets, and other minor details. It is once again my primary tool for capturing thoughts, managing to-dos, and even transferring files across devices.

Honestly, it was partly accomplished with the help of LLM agents, but I read and understand every line of code changed, and I have to admit the final product might be slightly better than what I could have written manually.

## Thoughts on A and I

I've been discreetly trying various LLM tools and models in recent months, including Codex and OpenCode for writing and explaining code, OpenClaw as a personal assistant, and Gemini for regaining my mental health. They all work very well, and I can no longer treat this type of technology as just *slop*.

However, I feel pessimistic about the [macroeconomic effects](https://www.citriniresearch.com/p/2028gic) caused by the development of AI, and I feel angry when I see CEOs expressing excitement over "productivity boosts". As someone who writes code for a living, the "real work" part of my job is being completely replaced by typing a spell into the terminal and staring at the magic happening. It feels both interesting and vacant. I have a strong feeling that becoming unemployed is more a matter of "when" than "if", as I know my skills will eventually no longer be needed in this new reality. I also feel scared of a future where we individuals can no longer afford computer components and have to rent resources for everything.

But honestly, somehow I feel the current labor system should come to an end anyway, as it has been deteriorating across the whole planet for multiple decades. People have been working longer hours, doing more [bullshit jobs](https://davidgraeber.org/books/bullshit-jobs/), and corporations have been betraying societal benefit for power and profit, a.k.a. "shareholder value" all along, especially in the tech industry. And when critics point out that LLM training steals knowledge and infringes on copyright, I feel the current copyright system should come to an end too, as it was designed for monopoly and corporate profits instead of creative workers all along.

In the end, I respect AI vegetarians, and there are valid reasons to avoid and reject this type of technology, especially when it is controlled by oligarchs. But the world is moving in a direction where this progress can no longer be decelerated, and it is affecting everyone. The alternative might be guiding it to be controlled by the many. The progress of open weight models, which technically can be run by anyone with enough hardware, such as MiniMax 2.5, Kimi 2.5, GLM 5, and Qwen 3.5, is inspiring, and there might be similar hope for [RAM](https://wccftech.com/cxmt-debuts-domestically-produced-ddr5-memory-8000-mtps-lpddr5-10667-mtps/) and other hardware.

## Trips and Live Concerts

Somehow, over the past few years, anime music events and live concerts had become a weekly normalcy in my city. While I only attended a few, it felt good to be hopeful and always anticipating the next surprise from my favorite seiyuu groups. That all came to an end due to the diplomatic tensions that started in Nov 2025. I went through a kind of despondency but managed to navigate this new reality, and well, with the help of LLMs.

Nevertheless, I attended two BanG Dream! live concerts this January. *Poppin'Party New Year LIVE - Happy BanG Year!!* in Ariake was so much fun and deeply healing. The setlist was fabulous: *Setsunai Sandglass*, two versions of *Yes! BanG_Dream!*, and *Drive Your Heart* are all favorites of mine. I also enjoyed the pure fun vibe of the live performance, Hego's sunglasses, Ayasa's rattle-drum, and all the stage settings were incredibly amusing.

The second was *Roselia Asia Tour - Neuweltfahrt* at Zepp Osaka Bayside, which was originally planned for my local city. It was a challenging trip, as heavy fog delayed my plane for 5 hours. However, the livehouse experience was beyond exciting. The stage was very close, and the acoustics were fantastic. My tears burst out hearing *Ringing Bloom*, *Hidamari Rhodonite*, *Kiseki*, and *Yakusoku*. As Kudoharu said, “Please carry the energy for the ones who can’t come”, we shouted loudly: We went all out to win!

During these two speedrun trips, I also watched the movie *Love Live! Nijigasaki High School Idol Club Final Chapter Part 2* in a theater, and visited many places where the story of Nijigasaki happens around Odaiba, Ariake and Umeda.

What I learned from these trips, as well as everything that has recently happened on this planet, is actually similar to the story of Final Fantasy VII. The world is filled with "mako poisoning", but we still have a need to protect our *Seventh Heaven*, our families, our hobbies, our homelabs, our NAS, and our self-hosted applications. In the end, the *lifestream* of this planet can be saved. As long as I have the *<ruby><rb>Kakugo</rb><rt>覚悟</rt></ruby>*, I can always find my *<ruby><rb>Neuweltfahrt</rb><rt>新世界航路</rt></ruby>*.

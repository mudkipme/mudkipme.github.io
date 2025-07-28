---
title: Updates 2025 H1
date: 2025-07-28 23:53:33
tags:
---

2025 has been an eventful year, with many developments in both real life and my hobbies.

## Home Network

My family moved to a new place this summer, which provided an opportunity to upgrade the network setup once again.

Nowadays, ISP cable modems often also function as routers. Previously, I would ask my ISP to switch the modem to bridge mode and use my own OpenWRT router to connect via PPPoE. In our new home, the WAN connection is provided by the rental agency, and the cable modem is fully managed by the ISP. Neither the rental agency nor the ISP knows how to retrieve the PPPoE password, so they're unable to switch the modem to bridge mode.

While I could register a new fiber WAN connection, the current speed of 500Mbps down / 40Mbps up is sufficient. Additionally, I still receive a /60 IPv6 pool. The IPv4 network is behind CGNAT (NAT Type B), regardless of whether the router uses DHCP or PPPoE.

The main challenge (and opportunity) is that there's no network port in our bedroom. To solve this, I had to run an invisible fiber cable between the living room, where my homelab cabinet is located, and the bedroom, where I use my PC and gaming devices. This also gave me the chance to upgrade our intranet to a 10GbE/2.5GbE network.

The network switches I added include a XikeStor SKS3200-8E2X (eight 2.5GbE ports and two 10GbE ports) in my homelab cabinet and a SKS3200-5E2X (five 2.5GbE ports and two 10GbE ports) in the bedroom. I also installed a used Synology E10G18-T1 in the DS1621+, a pair of Sirivision SFP+ transceivers to link the two switches, two XikeStor SFP+ to RJ45 adapters for the DS1621+ and the NUC 12 Extreme PC, and a UGREEN 2.5G USB-C to Ethernet adapter for the iMac. As a result, I now have a 10Gbps connection between the NAS and the NUC 12 Extreme PC, along with 2.5Gbps connections for several other devices.

A week after setting up the intranet, I encountered a strange issue: whenever I transferred files from the NAS to the iMac or wireless devices, the network in our bedroom would freeze, even basic DNS requests would time out. Interestingly, I didn't experience the same problem when transferring files in the opposite direction or from the NAS to the NUC, which has a 10GbE connection, even though those transfers were about three times faster.

After some research using ChatGPT, I discovered that the issue was caused by a feature called [flow control](https://en.wikipedia.org/wiki/Ethernet_flow_control). Fortunately, the XikeStor switches include a web-based admin interface, and the problem was resolved after I disabled flow control on the 10GbE ports.

## Devices Reshuffle

The biggest upgrade this year is the NUC 12 Extreme PC. The main issue with this machine was the unbearable noise during midnight gaming sessions. Fortunately, I found [a solution](https://soulteary.com/2025/03/27/recent-heat-dissipation-upgrade-record-of-homelab.html) from another user with the same NUC model. I replaced the top case fans with three Thermalright TL-B9 units, and now the PC is much quieter.

Another major upgrade was the GPU. I replaced the RTX 3080 with a [PowerColor Reaper RX 9070 XT](https://www.powercolor.com/product-detail212.htm). AFAIK it's the only modern mid-range GPU that fits inside the NUC 12 Extreme chassis. The RX 9070 XT performs significantly better in newer titles like *Clair Obscur: Expedition 33* and *Assassin's Creed Shadows*, even when its TDP is limited to 70%. It's also a relief to be free from NVIDIA-related issues on Linux, thanks to the switch to AMD. That said, I'm still waiting for [Mesa 25.2](https://www.phoronix.com/news/RADV-VK_EXT_shader_float8) to enable FSR 4 support.

The display of my Minisforum V3 Tablet stopped working on January, and customer service informed me that they couldn't repair it since the model is no longer in production. They offered a partial refund, which I found reasonable for a device I had used for nine months.

I also upgraded my [Lenovo Legion Y700](https://mudkip.me/2024/02/28/Spiritual-Successor-to-the-Google-Nexus-7/) (Legion Tab) to the 3rd generation, which features the more powerful Snapdragon 8 Gen 3 chip. Although the 4th generation was released shortly afterward, the nano-textured display on the 3rd gen made the upgrade worthwhile.

Recently, I sold my Steam Deck LCD, Aya Odin 2 Pro, and Anbernic RG35XXSP. In their place, I picked up a Retroid Pocket Flip 2, as well as repurpose the Legion Tab for handheld gaming. The reason behind this shift is that game streaming from my PC to the Legion Tab delivers far better graphics and smoothness than any handheld PC like the Steam Deck. The Retroid Pocket Flip 2 strikes a great balance for retro game emulation and has a better screen than both the Odin 2 and the RG35XXSP. The Legion Tab also works well for DS and 3DS emulation with its vertical layout.

I also connected a spare dummy HDMI plug to the NUC 12 Extreme PC, disabled the automatic display turn-off in KDE settings (while keeping auto-sleep enabled since I can wake the system via WoL), and configured Sunshine to improve game streaming experience.

* **Do commands**:

  ```bash
  kscreen-doctor output.HDMI-A-2.enable output.HDMI-A-2.mode.${SUNSHINE_CLIENT_WIDTH}x${SUNSHINE_CLIENT_HEIGHT}@60 output.DP-3.disable
  loginctl unlock-session
  ```

  This enables the dummy HDMI output at the correct resolution, disables the primary display, and unlocks the session if it's locked.

* **Undo command**:

  ```bash
  kscreen-doctor output.HDMI-A-2.disable output.DP-3.enable
  ```

  This disables the dummy output and re-enables the main display.

Fortunately, I was able to get a Nintendo Switch 2 at a reasonable price (MSRP plus import tax) and received it on the morning of the second day after its release. Since then, the Switch 2 has been my primary gaming device, mainly for _Mario Kart World_ and _Donkey Kong Bananza_. I've also restarted exploring Paldea in _Pokémon Scarlet_ and returned to building my world in _Dragon Quest Builders 2_.

## Homelab

Little has changed in my [homelab](https://mudkip.me/2024/01/31/My-2023-Homelab-Setup/), though I did downsize it slightly to reduce power consumption. The k3s cluster of 4 VMs has been consolidated into a single-node VM, and the storage solution has been simplified with [local-path-provisioner](https://github.com/rancher/local-path-provisioner), which consumes no additional power and is easier to backup. Since I now prefer using the NUC 12 Extreme for game streaming, I've replaced the Bazzite and Windows VMs on the homelab PC with a [Bluefin](https://projectbluefin.io/) installation, which runs various AI/ML experiments such as immich-machine-learning, [ollama](https://ollama.com/), and [InvokeAI](https://github.com/invoke-ai/InvokeAI).

The object storage on my NAS has been migrated from Minio to [Garage](https://garagehq.deuxfleurs.fr/), which offers much better performance for small files on the HDD RAID. I've also integrated [Pocket ID](https://pocket-id.org/) and [Tinyauth](https://tinyauth.app/) into some self-hosted apps, making logins easier and more secure. For photo backups, I've fully migrated to [Immich](https://immich.app/) and no longer rely on Synology's proprietary apps as [Synology is going fully user hostile](https://nascompares.com/2025/04/16/synology-2025-nas-hard-drive-and-ssd-lock-in-confirmed-bye-bye-seagate-and-wd/). However, I use PhotoSync on my iPhone because Immich currently doesn't play well with iCloud ([this issue should be fixed soon](https://github.com/immich-app/immich/releases/tag/v1.136.0)).

I also upgraded the cooling system in the homelab cabinet. The previously noisy fan, which was controlled via a smart plug, has been replaced with a Thermalright TL-G12B paired with a PWM controller mounted at the top. As a result, the average idle CPU temperature of the homelab PC dropped from 54°C to 48°C.

## 52Poké

52Poké migrated to the Hetzner data center in Helsinki in February 2025. This move reduced monthly cloud service costs by 55% while maintaining the same server and storage configurations. It also lowered the risk of relying on a U.S.-based service provider, particularly one entangled in [geopolitical tensions](https://www.theverge.com/2025/1/19/24347325/tiktok-service-providers-penalties-apple-google-orcale-trump), which could pose potential risks for 52Poké as well.

During the migration, 52Poké was upgraded to **MediaWiki 1.43**, the current LTS release, along with several enhancements, including [Math](https://www.mediawiki.org/wiki/Extension:Math), [VisualEditor](https://www.mediawiki.org/wiki/Extension:VisualEditor), audio support via [TimedMediaHandler](https://www.mediawiki.org/wiki/Extension:TimedMediaHandler), SVG image support, and native lazy-loading.

In recent years, 52Poké Wiki has experienced increasingly aggressive and indistinguishable bot network crawling, which has led to a lower cache hit rate and occasional website slowdowns. This is likely due to developments in LLMs. For now, we have blocked known AI bots and enabled Cloudflare challenge mode for pages outside the main namespace.

## Side Projects

My side projects have been a bit quiet over the past few months, but I'm trying to rediscover the joy and slowly resume work on an experimental project, along with updates for Moe Memos, most importantly, the local storage feature.

It's been somewhat of a burnout due to the breaking changes in the Memos API, which have required repeated effort and created both urgency and dilemma when updating Moe Memos. Thankfully, I've found [a workaround to convert the APIs to older versions](https://github.com/mudkipme/mortis). Moe Memos may still support the newer Memos API changes directly in future releases, as well as alternative backends, but it will no longer be a source of panic.

## Trips and Live Concerts

I visited Tokyo again this June for _[Aqours Finale LoveLive! Eikyuu Stage](https://www.lovelive-anime.jp/uranohoshi/live/live_detail.php?p=Aqours_Finale) Day 2_, and also traveled to places like Ikebukuro, Shibuya, and Asakusa.

LoveLive! is a franchise that holds deep meaning in my life. I've been a fan of Aqours since nearly the very beginning, almost ten years ago. The story and music of the anime have always inspired me and given me strength. I attended several Aqours live concerts before the pandemic, including the 2nd Live held at the same dome as the Eikyuu Stage. These are truly some of my most cherished memories.

I enjoyed all 24 songs performed on Eikyuu Stage Day 2, every one of them is a favorite of mine. The joyful atmosphere helped ease the bittersweet reality that this was their final live. I especially loved _[MY Mai☆TONIGHT](https://www.youtube.com/watch?v=uGPjt1j9Z7M)_ and _[WATER BLUE NEW WORLD](https://www.youtube.com/watch?v=zBnzYM375vQ)_, though it was a bit unfortunate they weren't the full version. Hearing _[HAPPY PARTY TRAIN](https://www.youtube.com/watch?v=sdxI33R8EJ0)_ again and finally experiencing _[Mitaiken HORIZON](https://www.youtube.com/watch?v=r78ZX-_fDds)_ live was fantastic. The anime recap during the intermission brought back so many sweet memories.

I cried a lot, and laughed a lot. The Aqours rainbow created by the entire dome during the encore was a huge success. The powerful chorus of _[Yuuki wa Doko ni? Kimi no Mune ni!](https://www.youtube.com/watch?v=1pTarTQDAuc)_ was deeply moving. I couldn't hold back my tears when Anju struck the "stop crying, smile, and thumbs-up" pose on the float.

What's unique about _LoveLive! Sunshine!!_ is how deeply it connects the beautiful city of [Numazu](https://www.city.numazu.shizuoka.jp/) with the fans. For us, Numazu is not only the setting of the anime and the stories of Aqours, it's also our spiritual hometown. I've visited twice and always felt warmly welcomed despite the language barrier. The city isn't just decorated with franchise elements, the local residents also truly understand the work and are proud of the Aqours members as if they were their own children. We love Numazu not just because of LoveLive!, we love [its sky, Mt. Fuji, and the sunshine](https://www.youtube.com/watch?v=UJ9zGXL63AU).

It has been a long journey as a LoveLiver. Just as Rikyako said,  
“だから、この先の人生もきっと、私も、みんなも、幸せなことがたくさん待っていると思います.”  
I believe in that, too.
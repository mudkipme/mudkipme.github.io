---
title: Sonos One First Impressions
date: 2018-03-04 10:46:25
---

![](https://micro.mudkip.me/wp-content/uploads/scontent.cdninstagram.com/vp/a984573d8311c642232ee77a043919c8/5B33B7C0/t51.2885-15/s640x640/sh0.08/e35/28430620_370592663421909_2447585747549552640_n.jpg)

I bought a Sonos One yesterday. Here are my first impressions:

* Sound quality is amazing. It's tremendously better than all Bluetooth speakers I have owned.
* Alexa is great. But slower than Siri. (Possibly due to my Internet connection)
* [Pikachu Talk](https://www.pokemon.com/us/app/pikachu-talk/) is a killing feature. It's fantastic.
* Plex integration works fine but Plex + Alexa is unsupported. <del>Navigating Plex library is slower than iOS apps.</del> *Update: Plex for Sonos had a [recent update](http://forums.plex.tv/discussion/311856/plex-for-sonos), making everything faster.*
* Pocket Casts is supported but no smart speed.
* Importing music library from SMB is great, and navigating is blazing fast.
* No local music services when using Alexa. (Because of region settings)
* I *can*, however, use AirPlay, by just run [airsonos](https://github.com/justintime/docker-airsonos) on my Synology NAS with Docker. It works fine but there is a 4 seconds latency. It's OK to play music or podcasts. But it can't be used to play video as the video and sound won't be in sync. AirPlay 2 is coming soon hopefully.
* Alexa can control my Yeelight by enabling its Skill and changing the Yeelight server location to Singapore.
* Surprisingly, Synology Audio Station can directly play to Sonos without any configuration. (like a USB speaker) It doesn’t have the latency that airsonos has. 
* Reminders seems working despite Sonos says it wasn’t supported yet.
* Things can be integrated with an [IFTTT Applet](https://ifttt.com/applets/ZtSApiVQ-create-things-to-dos-from-amazon-alexa) and mail rules.

## Update: How I ends up buying a Sonos One

I was thinking about getting a good wireless speaker for a while. When Apple announced HomePod I was tempted to wait and get one. I'm also keen on smart speaker services such as Amazon Alexa and Google Home. After HomePod comes out, and having read a dozen reviews and suffered from HomeKit syncing issues (though resolved with iOS 11.2.5). My choice ends up between HomePod and Sonos One.

The last straw comes on Feb. 27, the Pokémon Day. When Pikachu Talk comes to Alexa devices, I can't wait to get a Sonos One. Here's my comparison of the two speakers. Some factors will change when AirPlay 2 comes to both devices, but I don't think buying decisions should be based on future uncertain promises.

### When you should get a HomePod

* If you are an Apple Music or iTunes Match subscriber. (I'm not because I switch App Store account frequently and it will purge downloads of Apple Music)
* If you need it be the speaker when playing video on iPad or Apple TV.
* If you need AirPlay and don't have an always-on computer at home. (Router with open source firmware, Raspberry Pis, NAS, Mac mini, etc...)

### When you should get a Sonos One

* If you want to talk to Pikachu.
* If you want smarter speaker. (Alexa is systematically better than Siri because it is based on AWS Lambda backend)
* If you are a Spotify subscriber.
* If your main music library is on a home NAS.
* If you want stereo audio. (You need two, actually)
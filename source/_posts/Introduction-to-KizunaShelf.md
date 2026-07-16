---
title: "Introduction to KizunaShelf: A shelf for everything you love"
date: 2026-07-16 13:00:00
tags:
---

{% gp 2 %}
  ![](/images/2026/07/kizunashelf-1.webp)
  ![](/images/2026/07/kizunashelf-4.webp)
{% endgp %}

Everyone has a way of tracking what has left a mark on their life, whether it's a book, a movie, a TV show, an anime, or a song. Sometimes it’s an online service with a massive catalog, but you're always at the mercy of the platform deciding what stays and what goes. Other times, it's a delightful, well-designed offline mobile app, but your varied interests rarely fit into a single predefined catalog or data model. Plus, those apps and services could vanish tomorrow.

After cycling through countless tools, I realized I wanted something I could truly control. I started building custom databases in Airtable, then moved to Notion, and eventually tried self-hosting NocoDB. In the end, instead of constantly migrating databases, I decided to embrace the philosophy of *[files over apps](https://stephango.com/file-over-app)*. I settled on an Obsidian Vault where everything I care about is a Markdown file, complete with front matter and organized using Dataview and later Obsidian Bases.

But manually managing a database of over 2,000 Markdown files introduced a new kind of friction: hunting down metadata, updating statuses, and tracking dates. The tedious labor of acting like a librarian replaced the actual joy of discovering what to enjoy next.

KizunaShelf is the answer to all of that.

## Design philosophy

One principle I’ve always kept in mind is that KizunaShelf is not just another media tracker. Instead, it brings the dynamic flexibility of an Airtable-like database, letting users define exactly what their data means. The schema is yours to inspect and change, and serves as the source of truth for *meaning*.

A single `KizunaShelf/config.yaml` file saved in your vault folder declares your types, their fields, and the specific role of every field. It defines:

- Which field represents the title of an item, and which language that title uses.
- Which field describes a date and what that date represents (e.g., a game's release date, when you started watching an anime, or when a specific event occurred).
- Which field represents a status, along with its custom list of options.
- How objects relate to one another and how to connect different types.

But there is no need to be intimidated by schema complexity. Out of the box, KizunaShelf provides all the default presets you would expect from a traditional media tracker. You can instantly choose from pre-defined presets like Anime, TV & Drama, Movies, Games, Board Games, Books, Manga & Comics, Music Albums, Podcasts, Artists & Creators, and Characters.

These types can also connect directly to external metadata providers you already know, including TMDB, TheTVDB, IGDB, Bangumi, Apple Music, MyAnimeList, Google Books, and many more.

Adding an item to KizunaShelf is incredibly fast and simple: just tap the plus button, search for what you want, and tap to add it. Covers can be downloaded locally, while statuses and dates can be logged later at your own pace. KizunaShelf also understands the concept of "sub-items" like the episodes of an anime or the tracklist of a CD, allowing you to track them individually within the same Markdown file as a checklist or a bulleted list.

## Engineering architecture

![](/images/2026/07/kizunashelf-desktop.webp)

Under the hood, this has been a fascinating engineering experiment.

I had a very specific, ambitious checklist for this project:

- A self-hosted web app I can reach from anywhere.
- A lightweight desktop app on macOS, Linux and Windows, opening the exact same local folder as Obsidian.
- A true mobile app, delightful, quick, and native to my phone.

The answer to the desktop app was Tauri. But solving the mobile led to a "what if" moment: *What if I bridged the Rust core directly into a Swift module via UniFFI and wrote a native SwiftUI app around it?*

This raised another challenge: how do I keep the Rust core perfectly aligned across what are essentially "2.5 clients" (since the Tauri desktop app shares almost all of its frontend code with the web app)?

My solution was to generate an OpenAPI (Swagger) specification directly from the Rust backend, and then use that spec to auto-generate TypeScript and Swift clients.

The result is a truly cross-platform architecture. The iOS app is fully native SwiftUI, and the desktop app avoids Electron's weight. A future Android app can follow this exact same architecture, matching features with the other clients while remaining completely native to the platform.

One hiccup encountered while building the app was Unicode NFC vs NFD normalization on different platforms. This has been resolved and it is safe to use *Pokémon* or *ポケモン* in filenames. The wikilinks and relation matching are normalized across NFC/NFD differences.

## *kizuna* (絆): the bond between things that stay connected

{% gp 2 %}
  ![](/images/2026/07/kizunashelf-3.webp)
  ![](/images/2026/07/kizunashelf-2.webp)
{% endgp %}

Many works mean the world to me, whether they are anime series, video games, or [the music project that inspired the name of this app](https://www.youtube.com/watch?v=0aBsD9jpL5I). They are worth remembering, and they deserve to be connected to the specific moments of our lives. KizunaShelf is designed to map out those very connections. The calendar tracks upcoming releases, plans, and daily journal entries that mention the things you care about. Meanwhile, the activity feed curates these moments into a timeline of what you watched, played, and read, recording exactly when they became a part of your life.

The connections between items are at the heart of KizunaShelf. By gathering front matter relationships, wikilinks, backlinks, and lists into a single, detailed view, the app brings everything together in one place: your favorite anime character, their voice actor, the real-world event you attended, and the physical figure sitting on your shelf.

One day in early May 2017, I walked into a retro game store in Akihabara and bought a bundle of PSP games, including *[Ever17](https://en.wikipedia.org/wiki/Ever_17:_The_Out_of_Infinity)*. At that exact moment, the events of LeMU were unfolding in real time. That memory is exactly the kind of bond this app exists to keep.

## Forever, for dreaming

I've been building this app for months and dogfooding it for weeks. The iOS version of KizunaShelf is now available on [TestFlight](https://testflight.apple.com/join/hE7k3sWd) for beta testing, and the open source desktop and self-hosted web versions will be available soon. An Android version is planned for later this year or next. I am committed to maintaining this app for the foreseeable future.

But all apps eventually fade away. KizunaShelf is designed with its own mortality in mind. The app has no servers to store your data and no proprietary formats. Everything kept in KizunaShelf is plain Markdown with a bit of human-readable front matter. I've also used a few tricks to make it integrate well with existing ecosystems: the episodes of anime or TV shows have a 📅 for their airing dates, and checking that episode will add a ✅ date, following how it's represented by [Obsidian Tasks](https://publish.obsidian.md/tasks/Reference/Task+Formats/Tasks+Emoji+Format). Smart lists use a subset of the Obsidian Bases format, so you can open them with Obsidian and show the exact same items.

Your data will stay with you forever, with or without this app.

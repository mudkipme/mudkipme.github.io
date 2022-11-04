---
title: Project Updates
date: 2022-11-05 00:32:33
tags:
---

Inspired by [マリウス](https://xn--gckvb8fzb.com/project-updates-q3-2022/) and [Tao of Mac](https://taoofmac.com/space/blog/2022/10/28/1900), I'd like to share some tech staff I did and learned recently.

## Home System

My Homelab is composed of a Synology NAS, a Intel NUC and a Raspberry Pi 4. The NUC runs a free version of VMware ESXi. Before this quarter, it hosts an Arch Linux box for remote development, a Windows 10 VM runs Plex Media Server and Calibre-web, a Debian server works as a network gateway, as well as 3 K3OS nodes for most self-hosted workloads.

My Raspberry Pi mostly worked as a duplication of the NUC for some workload, such as network gateway and [code-server](https://github.com/coder/code-server) and my Synology stores everything.

While [K3S](https://github.com/k3s-io/k3s) is my favorite Kubernetes distribution, K3OS hasn't received any update since SUSE's acquisition of Rancher, it is now an abandoned project and I've been thinking about replacing it.

[Talos](https://www.talos.dev/) is a distribution got a lot love in the [home Kubernetes community](https://github.com/k8s-at-home/awesome-home-kubernetes). I tried creating a cluster with one control plane and one worker node and put some workload on it but it didn't work for me. The internal DNS server (coredns) stopped responding after I randomly tweaked a few settings, started a few pods or just restarted the host several times. I failed to bring Synology CSI up following [Talos's guide](https://www.talos.dev/v1.2/kubernetes-guides/configuration/synology-csi/), though I did set up [democratic-csi](https://github.com/democratic-csi/democratic-csi) successfully.

I guess the DNS issue is related to the network configuration of my home environment but couldn't figure out what when wrong exactly. So eventually I took the clumsy way and manually set up 4 Ubuntu Server VMs and installed k3s manually. It didn't take long and after a dozen minutes my home Kubernetes cluster is up again.

The Raspberry Pi 4 is more valuable than ever due to its skyrocketing price. Since it boots with a 500GB USB SSD, it's actually very fast to run lots of workload. It's now working as a network gateway for my home devices, a remote development server and a Home Assistant box.

With GPU price back to normal, I built a desktop workstation with Intel Dragon Canyon i9 NUC, WD SN750 NVMe SSD, 64GB RAM and a *lucky to find* 2-slot size RTX 3080 GPU. It's dual-booting with Windows 11 and [EndeavourOS](https://endeavouros.com/) i3. I'm very satisfied with its performance which can `cargo install` anything instantly and run any games in 4K 60fps.

## 52Poké

I've done some underlying refactoring with [klinklang](https://github.com/mudkipme/klinklang) (a.k.a. 52Poké Wiki Utilities). It's a small project to do automation on 52Poké Wiki. For example, it can trigger update to [MediaWiki:Common.css](https://wiki.52poke.com/wiki/MediaWiki:Common.css) when [52W:层叠样式表](https://wiki.52poke.com/wiki/%E7%A5%9E%E5%A5%87%E5%AE%9D%E8%B4%9D%E7%99%BE%E7%A7%91:%E5%B1%82%E5%8F%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8) is updated. It can also be a glossary translator and sync with various lists on the wiki.

The tech stack now includes modern JavaScript/TypeScript frameworks such as [fastify](https://www.fastify.io/), [Prisma](https://www.prisma.io/), [Vite](https://vitejs.dev/) and [pnpm](https://pnpm.io/). Particularly I like the dependency injection implementation of [awilix](https://github.com/jeffijoe/awilix). The refactoring is a step to something I planned many years ago: a workflow engine for MediaWiki, which let wiki editors write automation tasks with [Amazon States Language](https://states-language.net/).

On the infrastructure side, the LKE cluster had went through two Kubernetes upgrade smoothly. I'm planning [some major updates](https://github.com/mudkipme/52poke/issues/34) along with MediaWiki 1.39 release, and 52Poké Wiki will have higher availability and cost much less.

52Poké Homepage and Forums is stagnated for a long time but I do wish to bring them back to life. There's not much to say yet.

## Other Side Projects

Throughout the past few years I've been tweaking my digital life to give myself full control over my data and host the services I rely on at home. On the other side, I‘ve been suffering from burnout and I feared losing passion for programming.

In September I figured out what I can do in a relatively short time to give myself a feeling of satisfaction, a mobile app for a [self-hosted memo hub](https://usememos.com) allowing me to capture ideas on the go. I spent a few nights and weekends building it with SwiftUI. It was a good experience and it's ready after a dozen days. I put it on TestFlight and the initial feedback was positive.

However Apple took me down with a dubious message: *We need additional time to evaluate your submission and Apple Developer Program account. Your submission status will appear as "Rejected" in App Store Connect while we investigate*.

It gave me an opportunity to learn and try modern Android development and I took another dozens of hours to build the Android counterpart with Jetpack Compose and Material You. After 44 days Apple finally approved this app and In the end I'm grateful I had this experience.

So here's [Moe Memos](https://memos.moe). It's [open source](https://memos.moe/open-source/) and I had fun creating it. I wish to build features like home screen widgets and offline support in next few months.
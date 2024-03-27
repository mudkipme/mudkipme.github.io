---
title: Notes on EndeavourOS
date: 2024-03-28 00:02:07
tags:
---

![KDE Plasma 6](/images/2024/03/plasma6.png)

I have been using [EndeavourOS](https://endeavouros.com/) on my Dragon Canyon NUC for months. It is my chosen Linux distribution because it offers an easy-to-install Arch Linux environment, and I am familiar with Arch Linux. I need to stay on the cutting edge for desktop environments, display protocols, and graphics drivers due to issues with NVIDIA and the Linux desktop (especially Wayland). Many developments are [happening](https://gitlab.freedesktop.org/xorg/xserver/-/merge_requests/967) in real-time to improve them. With Arch Linux, I can easily install an AUR package from a merge request, as well as switch to beta drivers when they become [available](https://github.com/NVIDIA/egl-wayland/pull/104#issuecomment-2010292221).

Wayland is important to me because I'm using a 27" 4K display. For the best visual size, it should be set to 150% fractional scaling. KDE Plasma supports fractional scaling under Wayland and has an option to "[let Xwayland applications scale themselves](https://pointieststick.com/2022/06/17/this-week-in-kde-non-blurry-xwayland-apps/)" to prevent them from being blurry. That's the reason I chose KDE as my desktop environment. Moreover, KDE Plasma 6 offers a nice experience both functionally and aesthetically.

Here is a note in Logseq that I use to track how I install and configure EndeavourOS. I'm interested in a declarative way to build operating systems and am slowly learning NixOS. However, in the meantime, I am very satisfied with my current EndeavourOS setup.

---

- Configure the Windows Registry to use UTC hardware time:
	```
	reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f
	```
- Disable Secure Boot and Fast Boot in the BIOS. If Fast Boot is enabled, accessing the BIOS by pressing F2 is difficult. Instead, I have to use Settings > System > Recovery > Advanced startup in Windows, and after rebooting, choose Troubleshoot > Advanced options > UEFI Firmware Settings to access the BIOS.
- Flash the EndeavourOS ISO to a USB disk using [Rufus](https://rufus.ie/en/), contrary to the [documentation](https://discovery.endeavouros.com/installation/create-install-media-usb-key/2021/03/) on the EndeavourOS website. I had to choose the GPT partition and ISO mode to make my PC recognize the boot drive.
- Change network settings in KDE settings: manually set the IP address and DNS and gateway to `192.168.1.2`.
- Install EndeavourOS using the online installer, KDE desktop environment, erasing the Samsung 970 EVO disk with btrfs and without swap.
- Eject the USB disk and reboot into EndeavourOS.
- Install `nvidia-inst` using `yay` and run `nvidia-inst` to install the GPU driver, then reboot again.
- Disable the Dummy HDMI Plug in Display Settings and set the scale to 150%; turn off Adaptive Sync.
- Fix the suspend issue by preserving video memory [as described here](https://wiki.archlinux.org/title/NVIDIA/Tips_and_tricks#Preserve_video_memory_after_suspend):
	- `sudo nano /etc/modprobe.d/nvidia-power-management.conf`
		- `options nvidia NVreg_PreserveVideoMemoryAllocations=1 NVreg_TemporaryFilePath=/var/tmp`
	- sudo systemctl enable nvidia-suspend.service
	- sudo systemctl enable nvidia-hibernate.service
	- sudo reinstall-kernels
- Install the `xorg-xwayland-explicit-sync-git` and `egl-wayland-git` AUR packages using `yay`. This will make Xwayland issues with NVIDIA more manageable.
- Install `fcitx5-im` and `fcitx5-chinese-addons` using `yay`, and select *Fcitx 5* in System Settings > Keyboard > Virtual Keyboard; add *Pinyin* as an Input Method.
- Copy `.ssh/id_rsa`, `.ssh/config`, and `.ssh/id_rsa.pub` from Windows on the same device.
- Enable `mdns` and `kdeconnect` in the Firewall configuration.
- Configure Firefox:
	- Extensions:
		- Mainichi
		- uBlock Origin
		- Bitwarden
		- floccus
	- Always show the bookmark bar.
	- Disable Recommend extensions and features as you browse.
	- Enable Proxy DNS when using SOCKS v5.
	- Disable DNS over HTTPS.
	- Disable Ask to save passwords.
	- Enable "Tell websites not to sell or share my data" and "Send websites a Do Not Track (DNT) request".
	- Uncheck all checkboxes in Firefox Data Collection and Use.
	- Uncheck "Block dangerous and deceptive content".
	- Toggle `identity.fxaccounts.enabled` to `false` in `about:config`.
	- Toggle `extensions.pocket.enabled` to `false` in `about:config`.
	- Set the homepage to "Blank Page".
- Disable "Show small window previews when hovering over tasks" in task manager options.
- Arch packages installed with `pacman`:
	- flatpak
	- thunderbird
	- obsidian
		- Create `.config/obsidian/user-flags.conf` with `--ozone-platform-hint=wayland --enable-wayland-ime`.
	- bitwarden
		- Create `.config/electron28-flags.conf` with the following content:
			```
			--ozone-platform-hint=wayland
			--enable-wayland-ime
			```
	- fastfetch
	- docker
		- Add the current user to the docker group: `sudo usermod -aG docker $USER`.
	- cuda
	- libreoffice-fresh
		- Create `.config/environment.d/env-vars.conf` with `SAL_USE_VCLPLUGIN=gtk3`. This can fix text and icon sizes.
	- btop
	- htop
	- bottom
	- nvtop
	- gst-plugins-qsv
	- gst-plugins-bad
	- libva-utils
	- intel-media-driver
	- intel-media-sdk
	- intel-gpu-tools
	- handbrake
	- gimp
	- krita
	- thunderbird
	- kdenlive
	- remmina
	- freerdp
	- discover
	- kid3
	- merkuro
	- zanshin
	- tokodon
	- kasts
	- telegram-desktop
	- ttf-jetbrains-mono
	- zeal
	- kubectl
	- kubectx
	- zsh
	- rustup
	- nextcloud-client
	- neovim
	- tmux
	- inkscape
	- pastel
	- yt-dlp
	- k3b
	- bat
	- dust
	- git-delta
	- eza
	- eva
	- fd
	- gitui
	- glow
	- gron
	- xh
	- pipe-rename
	- procs
	- yazi
	- ttf-hack-nerd
	- rclone
	- ripgrep
	- silicon
	- skim
	- tokei
	- viu
	- zellij
	- timeshift
		- Setup daily btrfs snapshots.
		- `systemctl enable cronie`.
	- nvidia-container-toolkit
	- speech-dispatcher
	- cmatrix
- AUR packages installed with `yay`:
	- logseq-desktop-bin
		- Note: Wayland has not been enabled for Logseq due to a bug causing the window to shrink with each start and occasional crashes on close.
	- visual-studio-code-bin
		- Create `.config/code-flags.conf` with the following content:
            ```
            --ozone-platform-hint=wayland
            --enable-wayland-ime
            ```
	- vlc-git
	- xone-dkms
	- spotify
		- Create `.config/spotify-flags.conf` with the following content:
            ```
            --enable-features=UseOzonePlatform 
            --ozone-platform=wayland
            --enable-wayland-ime
            ```
	- drawio-desktop
	- kopia-ui-bin
		- Set up daily backups of the home directory.
	- plex-mpv-shim
		- Open TCP 3000 and UDP 32410-32414 ports in firewall settings.
		- Set up auto-start in `~/.config/systemd/user/plex-mpv-shim.service`:
            ```ini
            [Unit]
            Description=Plex MPV Shim Service
            After=network.target
            
            [Service]
            Type=simple
            ExecStart=/usr/bin/plex-mpv-shim
            Restart=always
            RestartSec=3
            Environment=GDK_BACKEND=x11
            
            [Install]
            WantedBy=default.target
            ```
            ```bash
            systemctl --user daemon-reload
            systemctl --user enable plex-mpv-shim.service
            systemctl --user start plex-mpv-shim.service
            ```
- Flatpak apps:
	- Ungoogled Chromium
		- Create `~/.var/app/com.github.Eloston.UngoogledChromium/config/chromium-flags.conf` with `--ozone-platform-hint=wayland --enable-wayland-ime`.
	- Android Studio
	- OpenLens
	- DBeaver Community
	- Zotero
	- Discord
	- Plexamp
	- Flatseal
	- Gear Lever
- AppImage apps:
	- Insomnia
- Configure mpv for hardware decoding: create `~/.config/mpv.conf` and `~/.config/plex-mpv-shim/mpv.conf` with `hwdec=auto-copy`. Additionally, add the command `set hwdec auto-copy` in Haruna Media Player.
- Install `prezto`:
    ```bash
    zsh
    
    git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
    
    setopt EXTENDED_GLOB
    for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
    ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
    done
    
    chsh -s /bin/zsh
    ```
	- Configure Konsole command to `/bin/zsh`
	- Add pmodules in `.zpreztorc`: `git`, `syntax-highlighting`, `ssh`, `tmux`, `fasd` before `prompt`
- Install `goenv`:
    ```bash
    git clone https://github.com/go-nv/goenv.git ~/.goenv
    echo 'export GOENV_ROOT="$HOME/.goenv"' >> ~/.zshenv
    echo 'export PATH="$GOENV_ROOT/bin:$PATH"' >> ~/.zshenv
    echo 'eval "$(goenv init -)"' >> ~/.zshrc
    goenv install 1.22
    ```
- Install `fnm`:
    ```bash
    curl -fsSL https://fnm.vercel.app/install | bash
    fnm install 20
    ```
- Set up the rust toolchain and install some cargo applications:
    ```bash
    rustup install stable
    cargo install cargo-update
    cargo install dtool
    cargo install --locked csview
    cargo install fclones
    ```
	- Append `export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"` to `.zshrc`.
- Append aliases to `.zshrc`:
    ```bash
    alias comet-core="ssh comet-core.lan -t 'tmux new-session -A -s main'"
    alias porygon2="ssh porygon2.lan -t 'tmux new-session -A -s main'"
    
    alias vim="nvim"
    alias vi="nvim"
    alias vimdiff="nvim -d"
    
    export EDITOR="nvim"
    export GIT_EDITOR="nvim"
    ```
- Check that the Intel iGPU works for video encoding: `LIBVA_DRIVER_NAME=iHD vainfo --display drm --device /dev/dri/renderD129`.
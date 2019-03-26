#!/bin/sh
set -eu

STOW=$( which stow )
STOW_DIR=$THETAPI_HOME/pkg
REBOOT_FLAG=$THETAPI_HOME/.rebootreq
HUGO_URL="https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-ARM.deb"
DEV_PUBKEY='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXFbPpSVUYrNh1w5CyOjbFvYFjOWgr6lTIf2beKKLzVD/gbWHlp2gtZ9//zgxzUJ2Ml1tZ7vwOSR4vhMqRJ8eNjl6pp2e1jsxUE4ipHBsj2S+VWIiDJ5JYZ4SzNuL4fduASUmeHB+K7Lxe5zw3Ri8+Z0C9XjLwPqri8rR9sirBuZiobINTwu0IJMFrZmCloZ8r1gg2IgulRfT1C0f+P9coYjDkuRa4W1LdRmAsmKOTNG14YEWCQjRL8q4qtWF1hQ1KMBktrpEYh2uhZiKcPAFDlJXxrIEYtmQ8rGqL17a4Z50NhryW/plKLS/mDUHsW5XNPgvr8eILWid2AkT80pfB thetapi@thetanil.com'

echo "## $1 installing..."
echo "## TODO: BACKUP STOWED FILES"

case $1 in
  "keyboard")
    # TODO: /etc/defaults/keyboard remap caps:escape
    ;;
  "sshkeys")
    if [ -d $HOME/.ssh ] && \
       [ ! -f $HOME/.ssh/id_rsa ] && \
       [ ! -f $HOME/.ssh/id_rsa.pub ]; then
      ssh-keygen -trsa -N "" -f $HOME/.ssh/id_rsa
    else
      echo "could not generate ssh keys (already exist or ~/.ssh missing)"
    fi
    echo $DEV_PUBKEY >> $HOME/.ssh/authorized_keys2
    ;;
  "git")
    # TODO: make vars
    git config --global push.default simple
    git config --global user.email "thetapi@thetanil.com"
    git config --global user.name "thetapi"
    ;;
  "hugo")
    # TODO: AMD for deb, ARM for Pi
    if [ -f /etc/rpi-issue ] && [ ! -f $(which hugo) ]; then
      wget -O $HOME/hugo.deb $HUGO_URL
      sudo dpkg -i $HOME/hugo.deb
      rm $HOME/hugo.deb
      hugo version
      cd $THETAPI_HOME/ui
      hugo
    fi
    ;;
  "hosts")
    #TODO: Download latest and schedule update job
    sudo rm /etc/hosts
    sudo $STOW -t /etc hosts
    ;;
  "disable_useless")
    sudo systemctl disable avahi-daemon
    sudo systemctl stop avahi-daemon
    sudo systemctl disable triggerhappy
    sudo systemctl stop triggerhappy
    ;;
  "disable_bluetooth")
    sudo systemctl disable hciuart
    sudo systemctl stop hciuart
    sudo systemctl disable bluetooth
    sudo systemctl stop bluetooth

    if [ ! -f /etc/modprobe.d/blacklist-bluetooth.conf ]; then
      CONF = '#bluetooth\nblacklist btbcm\nblacklist hci_uart\n'
      echo $CONF | sudo tee /etc/modprobe.d/blacklist-bluetooth.conf
      touch "$REBOOT_FLAG"
    fi
    ;;
  "vim")
    $STOW -t $HOME $1
    if [ ! -d "${HOME}/.vim/bundle/Vundle.vim" ]; then
      git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    fi
    vim +PluginInstall +qall
    ;;
  "dnsmasq")
    if [ -f /etc/rpi-issue ]; then
      sudo apt install -y $1
      sudo $STOW -t /etc $1
      sudo systemctl enable $1
      sudo systemctl restart $1
    fi
    ;;
  "polipo")
    if [ -f /etc/rpi-issue ]; then
      sudo apt install -y $1
      sudo $STOW -t /etc/polipo $1
      sudo systemctl enable $1
      sudo systemctl restart $1
    fi
    ;;
  "privoxy")
    if [ -f /etc/rpi-issue ]; then
      sudo apt install -y $1
      [ -f /etc/privoxy/config ] && sudo rm /etc/privoxy/config
      [ -f /etc/privoxy/user.action ] && sudo rm /etc/privoxy/user.action
      [ -f /etc/privoxy/user.filter ] && sudo rm /etc/privoxy/user.filter
      sudo $STOW -t /etc/privoxy $1
      sudo systemctl enable $1
      sudo systemctl restart $1
    fi
    ;;
  "nginx")
    if [ -f /etc/rpi-issue ]; then
      sudo apt install -y $1
      sudo $STOW -t /etc/nginx $1
      sudo systemctl enable $1
      sudo systemctl restart $1
    fi
    ;;
  "disable_nvaudio")
    if [ ! -f /etc/rpi-issue ]; then
      if [ ! -f /etc/modprobe.d/blacklist-nvaudio.conf ]; then
        echo 'blacklist snd-hda-intel\n' | sudo tee /etc/modprobe.d/blacklist-nvaudio.conf
        touch "$REBOOT_FLAG"
      fi
    fi
    ;;
  "pulse_audio")
    # TODO: pulse audio setup for debian dev box
    sudo apt install -y pulseaudio pavucontrol
    ;;
  "dropbox")
    # TODO: dropbox for debian dev box
    # TODO: owncloud server
    ;;
  "spotify")
    if [ ! -f /etc/rpi-issue ]; then
      repo = 'deb http://repository.spotify.com stable non-free'
      sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 \
        --recv-keys 931FF8E79F0876134EDDBDCCA87FF9DF48BF1C90
      echo $repo | sudo tee /etc/apt/sources.list.d/spotify.list
      sudo apt update
      sudo apt install spotify-client
    fi
    ;;
  "terminator")
    if [ ! -f /etc/rpi-issue ]; then
      echo 'TODO'
    fi
    ;;
  "i3")
    if [ ! -f /etc/rpi-issue ]; then
      sudo apt install i3
      [ -f $HOME/.config/i3/config ] && \
        mv $HOME/.config/i3/config $HOME/.config/i3/config.thetapibak
      $STOW -t $HOME/.config/i3 $1
    fi
    ;;
  "debian_gui")
    # TODO: debian stuff for dev box
    # getty autologon
    # loginconfig virtual terminals
    # i3 + config (stow in ~/.config)
    # xterm
    # terminator + config
    # firefox-esr
    ;;
  *)
    $STOW -t $HOME $1
    ;;
esac

echo "## $1 installed."

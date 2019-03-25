#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$THETAPI_HOME/pkg
REBOOT_FLAG=$THETAPI_HOME/.rebootreq

echo "## $1 installing..."
echo "## TODO: ADD RPI CHECKS"
echo "## TODO: BACKUP STOWED FILES"


case $1 in
  "keyboard")
    # TODO: /etc/defaults/keyboard remap caps:escape
    ;;
  "sshkeys")
    if [ -d $HOME/.ssh ] && [ ! -f $HOME/.ssh/id_rsa ] && [ ! -f $HOME/.ssh/id_rsa.pub ]; then
      ssh-keygen -trsa -N "" -f $HOME/.ssh/id_rsa
    else
      echo "could not generate ssh keys (already exist or ~/.ssh missing)"
    fi
    ;;
  "git")
    # TODO: make vars
    git config --global user.email "thetapi@thetanil.com"
    git config --global user.name "thetapi"
    ;;
  "hugo")
    # TODO: AMD for deb, ARM for Pi
    wget -O $HOME/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-ARM.deb
    sudo dpkg -i $HOME/hugo.deb
    rm $HOME/hugo.deb
    hugo version
    cd $THETAPI_HOME/ui
    hugo
    ;;
  "hosts")
    #TODO: Download latest and schedule update job
    sudo rm /etc/hosts
    sudo $STOW -d $PKGDIR -t /etc hosts
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
      echo '#bluetooth\nblacklist btbcm\nblacklist hci_uart\n' | sudo tee /etc/modprobe.d/blacklist-bluetooth.conf
      touch "$REBOOT_FLAG"
    fi
    ;;
  "vim")
    $STOW -d $PKGDIR -t $HOME vim
    if [ ! -d "${HOME}/.vim/bundle/Vundle.vim" ]; then
      git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    fi
    vim +PluginInstall +qall
    ;;
  "dnsmasq")
    sudo apt install -y dnsmasq
    sudo $STOW -d $PKGDIR -t /etc dnsmasq
    sudo systemctl enable dnsmasq
    sudo systemctl restart dnsmasq
    #sudo systemctl disable dnsmasq
    #sudo systemctl stop dnsmasq
    ;;
  "polipo")
    sudo apt install -y polipo
    sudo $STOW -d $PKGDIR -t /etc/polipo polipo
    sudo systemctl enable polipo
    sudo systemctl restart polipo
    ;;
  "privoxy")
    sudo apt install -y privoxy
    [ -f /etc/privoxy/config ] && sudo rm /etc/privoxy/config
    [ -f /etc/privoxy/user.action ] && sudo rm /etc/privoxy/user.action
    [ -f /etc/privoxy/user.filter ] && sudo rm /etc/privoxy/user.filter
    sudo $STOW -d $PKGDIR -t /etc/privoxy privoxy
    sudo systemctl enable privoxy
    sudo systemctl restart privoxy
    ;;
  "nginx")
    sudo apt install -y nginx
    sudo $STOW -d $PKGDIR -t /etc/nginx nginx
    sudo systemctl enable nginx
    sudo systemctl restart nginx
    ;;
  "disable_nvaudio")
    # TODO: only for debian dev box
    if [ ! -f /etc/modprobe.d/blacklist-nvaudio.conf ]; then
      echo 'blacklist snd-hda-intel\n' | sudo tee /etc/modprobe.d/blacklist-nvaudio.conf
      touch "$REBOOT_FLAG"
    fi
    ;;
  "pulse_audio")
    # TODO: pulse audio setup for debian dev box
    ;;
  "dropbox")
    # TODO: dropbox for debian dev box
    # TODO: owncloud server
    ;;
  "spotify")
    # TODO: spotify for debian dev box
    ;;
  "terminator")
    # TODO: terminatorsetup for debian dev box
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
    $STOW -d $PKGDIR -t $HOME $1
    ;;
esac

reshell
echo "## $1 installed."

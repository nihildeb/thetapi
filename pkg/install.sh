#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$( dirname $( readlink -f "$0" ) )
REBOOT_FLAG="${THETAPI_HOME}/.rebootreq"

echo "## installing $1"
case $1 in
  "asd")
    echo "asd installed"
    ;;
  "hosts")
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

    if [ ! -f /etc/modprobe.d/thetapi-blacklist.conf ]; then
      echo '#bluetooth\nblacklist btbcm\nblacklist hci_uart\n' | sudo tee /etc/modprobe.d/thetapi-blacklist.conf
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
    #sudo systemctl enable dnsmasq
    #sudo systemctl restart dnsmasq
    sudo systemctl disable dnsmasq
    sudo systemctl stop dnsmasq
    ;;
  "squid")
    sudo apt install -y squid
    sudo rm /etc/squid/squid.conf
    sudo $STOW -d $PKGDIR -t /etc/squid squid
    sudo systemctl enable squid
    sudo systemctl restart squid
    ;;
  "nginx")
    sudo apt install -y nginx
    sudo $STOW -d $PKGDIR -t /etc/nginx nginx
    sudo systemctl enable nginx
    sudo systemctl restart nginx
    ;;
  *)
    $STOW -d $PKGDIR -t $HOME $1
    ;;
esac

echo "## $1 installed."

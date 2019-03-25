#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$THETAPI_HOME/pkg
REBOOT_FLAG=$THETAPI_HOME/.rebootreq

echo "## $1 installing..."

case $1 in
  "asd")
    echo "asd installed"
    ;;
  "git")
    git config --global user.email "thetapi@thetanil.com"
    git config --global user.name "thetapi"
    ;;
  "hugo")
    wget -O $HOME/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-ARM.deb
    sudo dpkg -i $HOME/hugo.deb
    rm $HOME/hugo.deb
    hugo version
    cd $THETAPI_HOME/ui
    hugo
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
  *)
    $STOW -d $PKGDIR -t $HOME $1
    ;;
esac

echo "## $1 installed."

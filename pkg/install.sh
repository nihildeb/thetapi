#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$( dirname $( readlink -f "$0" ) )

echo "## installing $1"
case $1 in
  "asd")
    echo "asd installed"
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
    ;;
  "squid")
    sudo apt install -y squid
    sudo $STOW -d $PKGDIR -t /etc squid
    sudo systemctl enable dnsmasq
    sudo systemctl restart dnsmasq
    ;;
  *)
    $STOW -d $PKGDIR -t $HOME $1
    ;;
esac

echo "## $1 installed."

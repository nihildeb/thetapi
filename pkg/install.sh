#!/bin/sh
set -eu

STOW=$( which stow )
PKGDIR=$( dirname $( readlink -f "$0" ) )
echo "PKGDIR $PKGDIR"

case $1 in
  "asd")
    echo "asd installed"
    ;;
  "vim")
    $STOW -d $PKGDIR -t $HOME vim
    git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
    vim +PluginInstall +qall
    ;;
  "dnsmasq")
    sudo $STOW -d $PKGDIR -t /etc dnsmasq
    sudo systemctl enable dnsmasq
    sudo systemctl restart dnsmasq
    ;;
  *)
    $STOW -d $PKGDIR -t $HOME $1
    ;;
esac


#!/bin/sh
set -eu

TPHOME="${HOME}/.thetapi"
LANG=en_US.UTF-8
LANGUAGE=en_US.UTF-8
LC_ALL=en_US.UTF-8
EDITOR=vim
PATH=$PATH:$TPHOME/bin

# TODO: if raspbian
if [ ! -f /etc/debian_version ]; then
  sudo sed -e '/en_GB/ s/^#*/#/' -i /etc/locale.gen
  sudo sed -e '/^#.*en_US\.UTF-8 /s/^#//' -i /etc/locale.gen
  echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' | sudo tee /etc/default/locale
  sudo locale-gen "en_US.UTF-8"
  sudo update-locale
fi

# https://stackoverflow.com/questions/4565700
# This key is only for development on the ALPI private developement network
# It is safe to delete it anywhere else, and it should be removed from releases
#export GIT_SSH_COMMAND='ssh -i /etc/alpi/private.key'

sudo apt update -y
sudo apt upgrade -y
sudo apt install -y vim git

git clone https://github.com/nihildeb/thetapi.git $TPHOME
cd $TPHOME
npm start

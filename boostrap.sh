#!/bin/sh
set -e
set -u

LANG=en_US.UTF-8
LANGUAGE=en_US.UTF-8
LC_TIME=en_US.UTF-8
LC_MONETARY=en_US.UTF-8
LC_ADDRESS=en_US.UTF-8
LC_TELEPHONE=en_US.UTF-8
LC_NAME=en_US.UTF-8
LC_MEASUREMENT=en_US.UTF-8
LC_IDENTIFICATION=en_US.UTF-8
LC_NUMERIC=en_US.UTF-8
LC_PAPER=en_US.UTF-8
LC_ALL=en_US.UTF-8

EDITOR=vim
PATH=$PATH:/thetapi/bin

sudo sed -e '/en_GB/ s/^#*/#/' -i /etc/locale.gen
sudo sed -e '/^#.*en_US\.UTF-8 /s/^#//' -i /etc/locale.gen
echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' | sudo tee /etc/default/locale
sudo locale-gen "en_US.UTF-8"
sudo update-locale

# https://stackoverflow.com/questions/4565700
# This key is only for development on the ALPI private developement network
# It is safe to delete it anywhere else, and it should be removed from releases
#export GIT_SSH_COMMAND='ssh -i /etc/alpi/private.key'

sudo apt update -y
sudo apt upgrade -y
sudo apt install -y vim git stow

git config --global user.email "thetapi@thetanil.com"
git config --global user.name "Theta Pi"

git clone https://github.com/nihildeb/thetapi.git ~/thetapi
~/thetapi/bin/update.sh

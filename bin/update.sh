#!/bin/sh
set -eu

sudo systemctl disable hciuart
sudo systemctl stop hciuart
sudo systemctl disable bluetooth
sudo systemctl stop bluetooth
sudo systemctl disable avahi-daemon
sudo systemctl stop avahi-daemon
sudo systemctl disable triggerhappy
sudo systemctl stop triggerhappy 

echo '#bluetooth\nblacklist btbcm\nblacklist hci_uart\n' | sudo tee /etc/modprobe.d/thetapi-blacklist.conf

exit

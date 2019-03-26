#!/bin/sh
set -eu

IPT='sudo /sbin/iptables'
LOCALIP=$(hostname -i)
LOCALNET='192.168.3.0/24'
echo "iptables config for host $LOCALIP on $LOCALNET"
LOG='LOGGING'

# only run on raspi
if [ ! -f /etc/rpi-issue ]; then
  echo 'exiting, not an RPi'
  exit 1
fi

# flush
$IPT -F
$IPT -X $LOG

# create logging table
$IPT -N $LOG
$IPT -A $LOG -m limit --limit 2/min -j LOG --log-prefix "IPTDROP: " --log-level 4

# never lose ssh on this device from localnet
$IPT -A INPUT -s $LOCALNET -d $LOCALIP -p tcp --dport 22 -j ACCEPT

# Standard TCP stuff
$IPT -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
$IPT -A FORWARD -i eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
$IPT -A OUTPUT -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
# Accept localhost to localIP
$IPT -A INPUT -d $LOCALIP -s 127.0.0.1 -j ACCEPT
$IPT -A INPUT -i lo -j ACCEPT

# Accept Privoxy
$IPT -A INPUT -d $LOCALIP -p tcp --dport 1080 -j ACCEPT

# nginx
$IPT -A INPUT -d $LOCALIP -p tcp --dport 80 -j ACCEPT
$IPT -A INPUT -d $LOCALIP -p tcp --dport 443 -j ACCEPT

# Accept DNSMasq DNS and DHCP
$IPT -A INPUT -s $LOCALNET -p udp --dport 67 -j ACCEPT
$IPT -A INPUT -s $LOCALNET -p udp --dport 53 -j ACCEPT

# Accept pings on localnet
$IPT -A INPUT -d $LOCALIP -s $LOCALNET -p icmp -j ACCEPT

# Loosey Goosey ATM

# Reject Local
$IPT -A INPUT -s $LOCALNET -d $LOCALIP -j REJECT

# Dropbox is noisy AF, dump before logging
$IPT -A INPUT -s $LOCALNET ! -d $LOCALIP -j DROP

# Log the rest
$IPT -A INPUT -j $LOG
$IPT -A FORWARD -j $LOG
# Drop the logged packets
$IPT -A $LOG -j DROP

# Show what we've done
$IPT -n -L -v --line-number

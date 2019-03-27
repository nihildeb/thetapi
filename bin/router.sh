#!/bin/sh
# a one armed "firewall" configuration
set -eu

IPT='sudo /sbin/iptables'
LOCALIP=$(hostname -i)
LOCALNET='192.168.3.0/24'
echo "iptables config for host $LOCALIP on $LOCALNET"
DROPLOG='DROPLOG'

# only run on raspi
if [ ! -f /etc/rpi-issue ]; then
  echo 'exiting, not an RPi'
  exit 1
fi

SYSCTL='sudo /sbin/sysctl'
$SYSCTL net.ipv4.ip_forward=1
# One Armed Router needs to NOT redirect to "upstream" router
$SYSCTL net.ipv4.conf.default.accept_source_route=0
$SYSCTL net.ipv4.conf.all.accept_source_route=0
$SYSCTL net.ipv4.conf.all.send_redirects=0
$SYSCTL net.ipv4.conf.all.accept_redirects=0

# flush & accept
$IPT -F
$IPT -X
$IPT -t nat -F
$IPT -P INPUT ACCEPT
$IPT -P OUTPUT ACCEPT
$IPT -P FORWARD DROP

#set +e # this errors if it's the first time we're running
#$IPT -X $LOG
#set -e

# create logging table
$IPT -N $DROPLOG
$IPT -A $DROPLOG -m limit --limit 2/min -j LOG --log-prefix "IPTDROP: " --log-level 4
# Drop the logged packets
$IPT -A $DROPLOG -j DROP

# never lose ssh on this device from localnet
$IPT -A INPUT -s $LOCALNET -d $LOCALIP -p tcp --dport 22 -j ACCEPT

# Loopback OK
$IPT -A INPUT -i lo -j ACCEPT
$IPT -A OUTPUT -o lo -j ACCEPT

# Localnet OK
$IPT -A INPUT -d $LOCALNET -s $LOCALNET -j ACCEPT
$IPT -A OUTPUT -d $LOCALNET -s $LOCALNET -j ACCEPT

# Let me out
#$IPT -A OUTPUT -o eth0 -s 192.168.3.1 -j ACCEPT
#$IPT -A OUTPUT -o eth0:0 -s 192.168.3.1 -j ACCEPT

# Accept Privoxy
$IPT -A INPUT -d $LOCALIP -p tcp --dport 1080 -j ACCEPT

# nginx
$IPT -A INPUT -d $LOCALIP -p tcp --dport 80 -j ACCEPT
$IPT -A INPUT -d $LOCALIP -p tcp --dport 443 -j ACCEPT

# Accept DNSMasq DNS and DHCP
$IPT -A INPUT -s $LOCALNET -p udp --dport 67 -j ACCEPT
$IPT -A INPUT -s $LOCALNET -p udp --dport 53 -j ACCEPT

## Forwarding
#$IPT -A FORWARD -i eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT
##$IPT -A FORWARD -i eth0 -o eth0:0 -j ACCEPT
#$IPT -A FORWARD -i eth0 -j ACCEPT
##$IPT -t nat -A POSTROUTING -o eth0:0 -j MASQUERADE
#$IPT -t nat -A POSTROUTING -j MASQUERADE
#$IPT -A FORWARD -j $DROPLOG

# SNAT
$IPT -t nat -A POSTROUTING -o eth0 -j SNAT --to-source $LOCALIP
$IPT -A FORWARD -i eth0 -o eth0 -s $LOCALNET -j ACCEPT
$IPT -A FORWARD -i eth0 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Standard TCP stuff
#$IPT -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
#$IPT -A OUTPUT -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
# Accept localhost to localIP
#$IPT -A INPUT -d $LOCALIP -s 127.0.0.1 -j ACCEPT



# NAT
#$IPT -t nat -P POSTROUTING DROP
#$IPT -t nat -A POSTROUTING -o eth0:0 -j MASQUERADE
#$IPT -t nat -A PREROUTING ACCEPT
#$IPT -t nat -A OUTPUT ACCEPT
# Transparently Proxy
#$IPT -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 1080
#$IPT -t mangle -A PREROUTING -p tcp --dport 80 -j TPROXY \
  #--tproxy-mark 0x1/0x1 --on-port 1080
#$IPT -t mangle -A PREROUTING -p tcp --dport 443 -j TPROXY \
  #--tproxy-mark 0x1/0x1 --on-port 1080

# Reject Local
$IPT -A INPUT -s $LOCALNET -d $LOCALIP -j REJECT

# Dropbox is noisy AF, dump before logging
#$IPT -A INPUT -s $LOCALNET ! -d $LOCALIP -j DROP

# Log the rest
#$IPT -A INPUT -j $DROPLOG
#$IPT -A FORWARD -j $DROPLOG

#sudo ip rule add fwmark 1 lookup 100
#sudo ip route add local 0.0.0.0/0 dev lo table 100
$IPT -Z

# Show what we've done
$IPT -n -L -v --line-number

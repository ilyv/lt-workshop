#!/usr/bin/env bash

sudo iptables -A OUTPUT -d postgres -p tcp -m tcp --dport 5432 -j ACCEPT
sudo iptables -A OUTPUT -d influxdb -p tcp -m tcp --dport 8086 -j ACCEPT
sudo iptables -A OUTPUT -d 93.158.134.96/32 -p tcp -m tcp --dport 443 -j ACCEPT
sudo iptables -A OUTPUT -d 93.158.134.96/32 -p tcp -m tcp --dport 80 -j ACCEPT
sudo iptables -A OUTPUT -d web -p tcp -m tcp --dport 3000 -j ACCEPT
sudo iptables -A OUTPUT -d web -p tcp -m tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A OUTPUT ! -p udp -m state --state NEW -j DROP

tail -f /dev/null
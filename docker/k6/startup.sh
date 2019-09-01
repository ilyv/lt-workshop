#!/usr/bin/env sh

apk add curl
iptables -A OUTPUT -d influxdb -p tcp -m tcp --dport 8086 -j ACCEPT
iptables -A OUTPUT -d 93.158.134.96/32 -p tcp -m tcp --dport 443 -j ACCEPT
iptables -A OUTPUT -d 93.158.134.96/32 -p tcp -m tcp --dport 80 -j ACCEPT
iptables -A OUTPUT -d web -p tcp -m tcp --dport 3000 -j ACCEPT
iptables -A OUTPUT -d web -p tcp -m tcp --dport 22 -j ACCEPT
iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT ! -p udp -m state --state NEW -j DROP

tail -f /dev/null
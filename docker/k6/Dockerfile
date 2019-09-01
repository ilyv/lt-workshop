FROM loadimpact/k6
RUN apk update -q && \
    apk add -q iptables
COPY startup.sh /tmp/startup.sh

ENTRYPOINT /tmp/startup.sh
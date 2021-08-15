FROM loadimpact/k6:0.33.0
RUN sudo apk update -q && \
    sudo apk add -q iptables
COPY startup.sh /tmp/startup.sh

ENTRYPOINT /tmp/startup.sh
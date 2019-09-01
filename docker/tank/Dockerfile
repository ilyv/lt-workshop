FROM direvius/yandex-tank
RUN sudo apt-get update -q && \
    sudo apt-get install -yq iptables
COPY startup.sh /tmp/startup.sh
#COPY ssh_key /tmp/ssh_key
#COPY ssh_config /tmp/ssh_config

ENTRYPOINT /tmp/startup.sh
FROM direvius/yandex-tank
RUN sudo apt-get update -q && \
    sudo apt-get install -yq iptables
COPY iptables.txt /tmp/iptables.txt
COPY startup.sh /tmp/startup.sh
COPY ssh_key /tmp/ssh_key
COPY ssh_config /tmp/ssh_config
RUN mkdir ~/.ssh && \
    cat /tmp/ssh_key > ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa && \
    cat /tmp/ssh_config > ~/.ssh/config
ENTRYPOINT /tmp/startup.sh
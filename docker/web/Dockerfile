FROM gobylang/todo-sample
RUN apt-get update -q && \
    apt-get install -yq openssh-server
COPY ssh_key.pub /tmp/ssh_key.pub
RUN mkdir ~/.ssh && \
    cat /tmp/ssh_key.pub > ~/.ssh/authorized_keys
CMD service ssh start; goby server.gb --bind 0.0.0.0:$PORT wsgi


FROM grafana/grafana:8.1.1-ubuntu

USER root

RUN apt-get update && apt-get -y install curl

# Change the default data directory (otherwise grafana.db won't persist)
RUN mkdir /var/lib/grafanadb
ENV GF_PATHS_DATA /var/lib/grafanadb

#RUN bash -c 'curl -i -XPOST http://influxdb:8086/query --data-urlencode "q=CREATE DATABASE k6"'
#RUN bash -c 'curl -i -XPOST http://influxdb:8086/query --data-urlencode "q=CREATE DATABASE tank"'

# Init Grafana sqlite db and preconfigure our data source to be our influxdb k6 db
RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data '"'"'{"name": "myinfluxdb", "type": "influxdb", "access": "proxy", "url": "http://influxdb:8086", "database": "k6", "isdefault": true}'"'"' \
    http://admin:admin@localhost:3000/api/datasources \
    && kill -SIGINT %%'

RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data '"'"'{"name": "tank-influxdb", "type": "influxdb", "access": "proxy", "url": "http://influxdb:8086", "database": "tank", "isdefault": false}'"'"' \
    http://admin:admin@localhost:3000/api/datasources \
    && kill -SIGINT %%'

RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data '"'"'{"name": "prometheusdb", "type": "prometheus", "access": "proxy", "url": "http://prometheus:9090"}'"'"' \
    http://admin:admin@localhost:3000/api/datasources \
    && kill -SIGINT %%'

COPY ./*.json ./
RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data @k6-dashboard.json \
    http://admin:admin@localhost:3000/api/dashboards/db \
    && kill -SIGINT %%'

RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data @tank-dashboard.json \
    http://admin:admin@localhost:3000/api/dashboards/db \
    && kill -SIGINT %%'

RUN bash -c '/run.sh & sleep 15 && curl -s -H "Content-Type: application/json" -X POST \
    --data @docker-dashboard.json \
    http://admin:admin@localhost:3000/api/dashboards/db \
    && kill -SIGINT %%'
CMD ["/run.sh"]
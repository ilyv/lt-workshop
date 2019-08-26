FROM influxdb:1.5

# Create a k6 db
RUN /bin/bash -c "influxd run & sleep 5 && influx -execute 'CREATE DATABASE k6' \
&& influx -execute 'CREATE DATABASE tank' \
&& kill %1 && sleep 5"

CMD ["influxd"]
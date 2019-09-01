#!/usr/bin/env bash

influxd run & sleep 5 && influx -execute 'CREATE DATABASE k6' \
 && influx -execute 'CREATE DATABASE tank' \
 && kill %1 && sleep 5
influxd
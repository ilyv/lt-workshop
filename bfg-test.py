import logging
import requests
import json
import datetime
import os
log = logging.getLogger(__name__)


class LoadTest(object):
    def __init__(self, gun):
        self.gun = gun
        self.host = 'web'

    def case1(self, missile):
        # Create a new item
        dt = str(datetime.datetime.now())
        r = requests.post('http://web:3000/items',
            data = json.dumps({"title":"Item at " + dt,"checked":0}),
            headers={'Content-type': 'application/json'})
        item_id = r.json()['id']
        with self.gun.measure("case1_step1") as sample:
            log.info("Shoot case 1: %s", missile)
            sample['proto_code'] = r.status_code
            sample['interval_real'] = r.elapsed.microseconds
      
        # Delete the item
        r = requests.delete('http://web:3000/items/'+str(item_id))
        with self.gun.measure("case1_step2") as sample:
            log.info("Shoot case 1: %s", missile)
            sample['proto_code'] = r.status_code
            sample['interval_real'] = r.elapsed.microseconds

    def setup(self, param):
        ''' this will be executed in each worker before the test starts '''
        log.info("Setting up LoadTest: %s", param)

    def teardown(self):
        ''' this will be executed in each worker after the end of the test '''
        log.info("Tearing down LoadTest")
        os._exit(0)
        return 0
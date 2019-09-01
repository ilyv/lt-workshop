import logging
import time
import os
import psycopg2
log = logging.getLogger(__name__)


class LoadTest(object):
    def __init__(self, gun):
        self.gun = gun
        self.host = 'web'

    def case1(self, missile):
        dt = str(time.time())

        conn = psycopg2.connect(dbname='goby_test', user='postgres',
                                host='postgres')
        cursor = conn.cursor()
        ts = time.time()

        cursor.execute('INSERT INTO list_items (title, checked) VALUES (%s, %s)', (dt, 'f'))

        cursor.close()
        conn.commit()
        conn.close()
        te = time.time()

        with self.gun.measure("case1_step1") as sample:
            log.info("Shoot case 1: %s", missile)
            sample['interval_real'] = int((te - ts)*1000000)

    def setup(self, param):
        ''' this will be executed in each worker before the test starts '''
        log.info("Setting up LoadTest: %s", param)

    def teardown(self):
        ''' this will be executed in each worker after the end of the test '''
        log.info("Tearing down LoadTest")
        os._exit(0)
        return 0
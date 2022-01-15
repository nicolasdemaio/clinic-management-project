import unittest
# from source.logger import *
from source.logger.custom_logger import custLogger
import pymongo

client = pymongo.MongoClient('mongodb://clinic-management-datab-shard-00-02.2df7e.mongodb.net:27017')

class TestMonger(unittest.TestCase):

    def test_mongo(self):
        logger = custLogger("demolog", logpath = "logs").log()
        
        logger.info("Estoy abajo connect")

        mydb = client['Employee']
        information = mydb.employeeinformation

        record = [
            {
                'firstname':'xNicoprox',
                'lastname':'xBestconx'
            },
            {
                'firstname':'Rodrigon',
                'lastname':'Elpepon'
            }
        ]
        information.insert_one(record)
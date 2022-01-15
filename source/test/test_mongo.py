import unittest
# from source.logger import *
from source.logger.custom_logger import custLogger
from mongoengine import *



class TestLogger(unittest.TestCase):

    def test_mongo(self):
        logger = custLogger("demolog", logpath = "logs").log()
        
        connect('tumblelog')
        logger.info("Estoy abajo connect")
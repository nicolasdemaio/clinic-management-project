import unittest
# from source.logger import *
from source.logger.custom_logger import custLogger


class TestLogger(unittest.TestCase):

    def test_a_logger(self):
        logger = custLogger("demolog", logpath = "logs").log()
        
        logger.info("info test")
        logger.debug("debyugaso")
        logger.warn("warnin")
        logger.error("errroor")
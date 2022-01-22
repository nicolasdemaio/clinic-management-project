import unittest
from source.tool.custom_logger import Logger

logger = Logger.get("logger", "logs")

class TestLogger(unittest.TestCase):

    def test_a_logger(self):
        
        logger.info("info test")
        logger.debug("debyugaso")
        logger.warn("warnin")
        logger.error("errroor")

    
    def test_split_a_string(self):
        
        fullname = "Nicolas Iglesias"
        username = (fullname.split()[0] + fullname.split()[-1]).lower()

        logger.info("<------------------------>")
        logger.info(username)
import unittest
from source.tool.custom_logger import Logger

class TestLogger(unittest.TestCase):

    def test_a_logger(self):
        logger = Logger.get("logger", "logs")

        logger.info("info test")
        logger.debug("debyugaso")
        logger.warn("warnin")
        logger.error("errroor")
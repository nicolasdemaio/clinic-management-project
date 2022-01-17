import unittest

from source.tool.custom_logger import CustomLogger


class TestLogger(unittest.TestCase):

    def test_a_logger(self):
        logger = CustomLogger("logger", "logs").get_configured_instance()
        
        logger.info("info test")
        logger.debug("debyugaso")
        logger.warn("warnin")
        logger.error("errroor")
from pathlib import Path
import inspect
import logging

class Logger:
    def __init__(self,logfile='logger',directory_to_export='logs',log_level=logging.DEBUG):
        Path(f"{directory_to_export}").mkdir(parents=True, exist_ok=True)
        self.directory = f"{directory_to_export}\{logfile}.log"

        logger_name = inspect.stack()[1][3]
        logger = logging.getLogger(logger_name)
        logger.setLevel(log_level)
        file_handler = logging.FileHandler(f"{self.directory}")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s - %(name)s - Line: %(lineno)d : %(message)s',datefmt='%m/%d/%Y %I:%M:%S')
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
        self.logger = logger
    
    def debug(self,message):
        self.logger.debug(message)
    
    def info(self,message):
        self.logger.info(message)
    
    def warn(self,message):
        self.logger.warn(message)
    
    def error(self,message):
        self.logger.error(message)
    
    def critical(self,message):
        self.logger.critical(message)
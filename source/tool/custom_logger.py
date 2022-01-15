from pathlib import Path
import inspect
import logging

class CustomLogger:
    def __init__(self,logfile='logger',directory_to_export='logs'):
        Path(f"{directory_to_export}").mkdir(parents=True, exist_ok=True)
        self.directory = f"{directory_to_export}\{logfile}.log"
    
    def get_configured_instance(self,log_level=logging.DEBUG):
        logger_name = inspect.stack()[1][3]
        logger = logging.getLogger(logger_name)
        logger.setLevel(log_level)
        file_handler = logging.FileHandler(f"{self.directory}")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s - %(name)s - Line: %(lineno)d : %(message)s',datefmt='%m/%d/%Y %I:%M:%S')
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
        return logger
import inspect
import logging

class custLogger:
    def __init__(self,logfile,logpath):
        self.filename = f"{logpath}\{logfile}.log"
    
    def log(self,logLevel=logging.DEBUG):
        # Seteo la Clase o metodo de donde lo llamo
        logger_name = inspect.stack()[1][3]
        # Creo el logger
        logger = logging.getLogger(logger_name) # log.__name__
        logger.setLevel(logLevel)
        # Creo el archivo handler donde se va a ubicar
        fh = logging.FileHandler(f"..\clinic-management-api\{self.filename}") # '..\clinic-management-api\logs\demolog.log'
        # Le doy formato a los logs
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s - %(name)s - Line: %(lineno)d : %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p') # %(pathname)s
        # Agrego el formato al file handler
        fh.setFormatter(formatter)
        logger.addHandler(fh)
        return logger
from datetime import datetime

class Logger:

    @staticmethod
    def warning(a_message):
        Logger.__log('WARNING', a_message)

    @staticmethod
    def info(a_message):
        Logger.__log('INFO', a_message)

    @staticmethod
    def __log(a_prefix, a_message):

        a_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        f = open("logger.log", "a")
        f.write(a_datetime + ' ' + a_prefix + ' ' + str(a_message) + '\n')
        f.close()

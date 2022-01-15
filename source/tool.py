from datetime import datetime

class Logger:

    default_filename = 'logger.log'

    @staticmethod
    def warning(an_object, a_filename=default_filename):
        Logger.__write_on_file_with('WARNING', an_object, a_filename)

    @staticmethod
    def error(an_object, a_filename=default_filename):
        Logger.__write_on_file_with('ERROR', an_object, a_filename)

    @staticmethod
    def info(an_object, a_filename=default_filename):
        Logger.__write_on_file_with('INFO', an_object, a_filename)

    @staticmethod
    def database(an_object, a_filename=default_filename):
        Logger.__write_on_file_with('DB', an_object, a_filename)

    # Private methods

    @staticmethod
    def __write_on_file_with(a_tag, an_object, a_filename):
        a_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        f = open(a_filename, "a")
        f.write(a_datetime + ' - ' + a_tag + ' - ' + str(an_object) + '\n')
        f.close()
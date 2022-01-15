from datetime import datetime

class Doctor:

    def __init__(self, fullname, document, address, phonenumber, email, birthdate, time_interval_off="None", registration_date= datetime.today()):
        self.fullname = fullname
        self.document = document
        self.address = address
        self.phonenumber = phonenumber
        self.email = email
        self.birthdate = birthdate
        self.registration_date = registration_date
        self.time_interval_off = time_interval_off # TimeInterval(unaFecha, otraFecha)

    def is_working(self, ask_date=datetime.today()):
        if self.time_interval_off == "None":
            return True
        elif (ask_date.weekday() > 4) or self.time_interval_off.includes(ask_date):
            return False
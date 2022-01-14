from datetime import timedelta

from source.model.utilities import *

class Appointment:

    def __init__(self, patient, doctor, datetime): # datetime = 14 01 2021 14:40:40
        self.patient = patient
        self.doctor = doctor
        self.time_interval = self.__get_time_interval_from(datetime)

    def starting_date(self):
        return self.time_interval.from_date

    def final_date(self):
        return self.time_interval.to_date

    # Private methods

    def __get_time_interval_from(self, datetime, minutes=30):
        appointment_duration = minutes * 60 * 60
        added_time = timedelta(seconds= appointment_duration)
        return TimeInterval(datetime,(datetime + added_time))
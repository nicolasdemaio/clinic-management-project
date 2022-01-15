from datetime import timedelta

from source.main.model.time_interval import TimeInterval

class Appointment:

    def __init__(self, patient, doctor, datetime):
        self.patient = patient
        self.doctor = doctor
        self.time_interval = self.__get_time_interval_from(datetime)

    # Private methods

    def __get_time_interval_from(self, datetime, minutes=30):
        appointment_duration = minutes * 60 * 60
        added_time = timedelta(seconds= appointment_duration)
        return TimeInterval(datetime,(datetime + added_time))
from mongoengine import *
from source.main.model.doctor import Doctor
from source.main.model.patient import Patient
from source.main.model.time_interval import TimeInterval

class Appointment(Document):

    patient = ReferenceField(Patient)
    doctor = ReferenceField(Doctor)
    time_interval = EmbeddedDocumentField(TimeInterval)

    @staticmethod
    def create_for(a_patient, a_doctor, a_datetime):
        time_interval = TimeInterval.create_with_time_adding_minutes(a_datetime, 30)
        return Appointment(patient=a_patient, doctor=a_doctor, time_interval=time_interval)

class ConfirmedAppointment(Document):

    appointment = ReferenceField(Appointment)
    confirmation_datetime = DateTimeField(required= True)
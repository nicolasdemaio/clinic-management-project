import unittest

from datetime import datetime, date

from source.main.model.appointment import Appointment
from source.main.model.doctor import Doctor
from source.main.model.document import IdentityDocument
from source.main.model.patient import Patient
from source.main.model.time_interval import TimeInterval


class TestAppointment(unittest.TestCase):

    def test_an_appointment_is_created_correctly(self):
        # Setup
        starting_date = datetime.today()

        a_birthdate = date(2020, 5, 17)
        patient_document = IdentityDocument(document_type='DNI',number='42575871')
        doctor_document = IdentityDocument(document_type='DNI',number='43575871')
        
        a_patient = Patient(
            fullname = 'Rodrigo Iglesias',
            document = patient_document,
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = a_birthdate
            )
 
        a_doctor = Doctor(
            fullname = 'Rodrigo Iglesias',
            document = doctor_document,
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = a_birthdate,
            registration_date = datetime.now(),
            time_interval_off = None
        )
        an_appointment = Appointment.create_for(a_patient, a_doctor, starting_date)

        # Assert
        assert an_appointment.patient == a_patient
        assert an_appointment.doctor == a_doctor
        assert an_appointment.time_interval == TimeInterval.create_with_time_adding_minutes(starting_date, 30)



        
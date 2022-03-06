import unittest
from datetime import date, datetime
from source.main.model.doctor import Doctor
from source.main.model.identity_document import IdentityDocument
from source.main.model.patient import Patient

# Class that provides instances of different objects for test.
class TestSupporter(unittest.TestCase):

    def new_patient(self):
        return Patient(
            fullname = 'Rodrigo Iglesias',
            document = self.new_document_for_patient(),
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = date(1995, 5, 17)
            )

    def new_doctor(self):
        return Doctor(
            fullname = 'Rodrigo Iglesias',
            document = self.new_document_for_doctor(),
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = date(1990, 5, 17),
            registration_date = datetime.now(),
            time_interval_off = None
        )

    def new_document_for_patient(self):
        return IdentityDocument(document_type='DNI',number= 42312772)

    def new_document_for_doctor(self):
        return IdentityDocument(document_type='DNI', number= 21589353)
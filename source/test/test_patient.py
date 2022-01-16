import unittest

from datetime import date
from source.main.model.document import IdentityDocument
from source.main.model.patient import Patient

class TestPatient(unittest.TestCase):

    def test_a_patient_is_created_correctly(self):
        # Setup
        a_birthdate = date(2020, 5, 17)
        a_document = IdentityDocument(document_type='DNI',number='42575871')
        
        a_patient = Patient(
            fullname = 'Rodrigo Iglesias',
            document = a_document,
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = a_birthdate
            )
        
        # Assert
        assert a_patient.document == a_document
        assert a_patient.fullname == 'Rodrigo Iglesias'
        assert a_patient.address == 'Madame Curie 363'
        assert a_patient.phonenumber == 12345
        assert a_patient.email == 'riglesias@test.com'
        assert a_patient.birthdate == a_birthdate
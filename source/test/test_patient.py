# Classes
# from re import A
# from source.model.document import Document
# from source.model.patient import Patient
# External Libraries
import unittest
from datetime import date


# IMPORTA CARPETA ENTERA, EXPLICA EN ANSWER #19
from source.main.model.document import Document
from source.main.model.patient import Patient
# https://www.py4u.net/discuss/10731


from source.logger import *

class TestPatient(unittest.TestCase):

    def test_a_patient_is_created_correctly(self):
        # Setup
        a_birthdate = date(2020, 5, 17)
        a_document = Document('DNI','42575871')
        
        a_patient = Patient(
            fullname = 'Rodrigo Iglesias',
            document = a_document,
            address = 'Madame Curie 363',
            phonenumber = '12345',
            email = 'riglesias@test.com',
            birthdate = a_birthdate
            )
        
        # Assert
        assert a_patient.document == a_document
        assert a_patient.fullname == 'Rodrigo Iglesias'
        assert a_patient.address == 'Madame Curie 363'
        assert a_patient.phonenumber == '12345'
        assert a_patient.email == 'riglesias@test.com'
        assert a_patient.birthdate == a_birthdate
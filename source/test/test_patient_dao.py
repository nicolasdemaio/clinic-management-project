import unittest
from datetime import date
from configuration import perform_database_connection
from source.main.model.document import IdentityDocument
from source.main.model.patient import Patient
from source.main.repository.dao import PatientDAO

class TestPatientDAO(unittest.TestCase):

    perform_database_connection()

    def test_a_patient_can_be_persisted(self):
        #Setup
        a_birthdate = date(2020, 5, 17)
        a_document = IdentityDocument(document_type='DNI',number='42575871')
        
        a_patient = Patient(
            fullname = 'Rodrigo Iglesias',
            document = a_document,
            address = 'Madame Curie 363',
            phonenumber = '12345',
            email = 'riglesias@test.com',
            birthdate = a_birthdate
            )

        patient_dao = PatientDAO()

        #Excercise
        patient_dao.persist(a_patient)


        #Assert
        assert a_patient in patient_dao.get_all()

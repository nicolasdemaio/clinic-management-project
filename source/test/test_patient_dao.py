import unittest
from datetime import date

from source.main.model.document import IdentityDocument
from source.main.model.patient import Patient
from source.main.repository.patient_dao import PatientDAO

class TestPatientDAO(unittest.TestCase):

    def test_a_patient_can_be_persisted(self):
        #Setup
        a_birthdate = date(2020, 5, 17)
        a_document = IdentityDocument('DNI','42575871')
        
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
        persisted_patient_id = patient_dao.persist(a_patient).inserted_id
        obtained_patient = patient_dao.get_by_id(persisted_patient_id)

        #Assert
        assert obtained_patient['fullname'] == a_patient.fullname

from configuration import perform_database_connection
from source.main.repository.dao import PatientDAO
from source.test.test_supporter import TestSupporter

class TestPatientDAO(TestSupporter):

    perform_database_connection()

    def test_a_patient_can_be_persisted(self):
        #Setup
        a_patient = self.new_patient()

        patient_dao = PatientDAO()

        #Excercise
        patient_dao.persist(a_patient)

        #Assert
        assert a_patient in patient_dao.get_all()

from source.main.repository.dao import PatientDAO

class PatientService:

    def __init__(self, patient_dao=PatientDAO()):
        self.patient_dao = patient_dao

    def get_patients(self):
        return self.patient_dao.get_all()
from source.main.repository.dao import PatientDAO

class PatientService:

    def __init__(self, patient_dao=PatientDAO()):
        self.patient_dao = patient_dao

    def get_patients(self):
        return self.patient_dao.get_all()
    
    def create_a_patient(self, a_patient):
        self.patient_dao.persist(a_patient)
        return a_patient

    def get_patient_by_id(self, id):
        return self.patient_dao.get_by_id(id)
    
    def delete_patient_by_id(self, id):
        self.patient_dao.delete_by_id(id)
    
    def update_patient_by_id(self, id, updated_patient_data):
        return self.patient_dao.update_by_id(id, updated_patient_data)
        
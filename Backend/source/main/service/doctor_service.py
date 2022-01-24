from source.main.repository.dao import DoctorDAO
from source.main.service.user_service import UserService


class DoctorService:

    def __init__(self, doctor_dao=DoctorDAO(), user_service=UserService()):
        self.doctor_dao = doctor_dao
        self.user_service = user_service

    def get_doctors(self):
        return self.doctor_dao.get_all()
    
    def create_a_doctor(self, a_doctor):
        self.user_service.create_account_with(a_doctor.fullname, a_doctor.document.number, ['DOCTOR'])
        self.doctor_dao.persist(a_doctor)
        return a_doctor

    def get_doctor_by_id(self, id):
        return self.doctor_dao.get_by_id(id)
    
    def delete_doctor_by_id(self, id):
        self.doctor_dao.delete_by_id(id)
    
    def update_doctor_by_id(self, id, updated_doctor_data):
        return self.doctor_dao.update_by_id(id, updated_doctor_data)
        
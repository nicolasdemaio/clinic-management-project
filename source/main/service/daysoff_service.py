from datetime import datetime
from source.main.model.days_off import DaysOffRequest
from source.main.repository.dao import DaysOffDAO, DoctorDAO

class DaysOffService:

    def __init__(self, days_off_dao=DaysOffDAO(), doctor_dao=DoctorDAO()):
        self.days_off_dao = days_off_dao
        self.doctor_dao = doctor_dao

    def get_days_offs(self):
        return self.days_off_dao.get_all()
    
    def create_a_days_off_using(self, days_off_request_draft):
        doctor = self.doctor_dao.get_by_id(days_off_request_draft.doctor_id)
        reason = days_off_request_draft.reason
        time_range = days_off_request_draft.time_range
        datetime_of_request = datetime.now()
        creation_of_daysoff = DaysOffRequest(doctor= doctor,reason= reason,time_range= time_range,datetime_of_request=datetime_of_request)
        self.days_off_dao.persist(creation_of_daysoff)
        return creation_of_daysoff
        
    def get_days_off_by_id(self, id):
        return self.days_off_dao.get_by_id(id)
    
    def delete_days_off_by_id(self, id):
        self.days_off_dao.delete_by_id(id)
    
    # TODO: VER SI USAR A FUTURO PARA CAMBIAR LOS STATES
    # def update_days_off_by_id(self, id, updated_days_off_data):
    #     return self.days_off_dao.update_by_id(id, updated_days_off_data)
        
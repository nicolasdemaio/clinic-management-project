from source.main.repository.dao import AppointmentDAO

class AppointmentService:

    def __init__(self, appointment_dao=AppointmentDAO()):
        self.appointment_dao = appointment_dao

    def get_appointments(self):
        return self.appointment_dao.get_all()
    
    def create_a_appointment(self, a_appointment):
        self.appointment_dao.persist(a_appointment)
        return a_appointment

    def get_appointment_by_id(self, id):
        return self.appointment_dao.get_by_id(id)
    
    def delete_appointment_by_id(self, id):
        self.appointment_dao.delete_by_id(id)
    
    def update_appointment_by_id(self, id, updated_appointment_data):
        return self.appointment_dao.update_by_id(id, updated_appointment_data)
        
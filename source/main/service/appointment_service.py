from source.main.model.appointment import Appointment, ConfirmedAppointment
from source.main.repository.dao import AppointmentDAO, DoctorDAO, PatientDAO, ConfirmedAppointmentsDAO

class AppointmentService:

    def __init__(self, appointment_dao=AppointmentDAO(), patient_dao=PatientDAO(), doctor_dao=DoctorDAO()):
        self.appointment_dao = appointment_dao
        self.doctor_dao = doctor_dao
        self.patient_dao = patient_dao

    def get_appointments(self):
        return self.appointment_dao.get_all()
    
    def create_a_appointment_using(self, a_registration_draft):
        patient = self.patient_dao.get_by_id(a_registration_draft.patient_id)
        doctor = self.doctor_dao.get_by_id(a_registration_draft.doctor_id)
        a_datetime = a_registration_draft.datetime

        created_appointment = Appointment.create_for(patient,doctor,a_datetime)

        self.appointment_dao.persist(created_appointment)
        return created_appointment

    def get_appointment_by_id(self, id):
        return self.appointment_dao.get_by_id(id)
    
    def delete_appointment_by_id(self, id):
        self.appointment_dao.delete_by_id(id)
    
    def update_appointment_by_id(self, id, updated_appointment_data):
        return self.appointment_dao.update_by_id(id, updated_appointment_data)
        

class ConfirmedAppointmentsService:
    def __init__(self, confirmed_appointment_dao=ConfirmedAppointmentsDAO(), appointment_dao=AppointmentDAO()):
        self.confirmed_appointment_dao = confirmed_appointment_dao
        self.appointment_dao = appointment_dao

    def get_confirmed_appointments(self):
        return self.confirmed_appointment_dao.get_all()
    
    def confirm_an_appointment_with(self, appointment_id, confirmation_datetime):
        confirmed_appointment = self.appointment_dao.get_by_id(appointment_id)
        a_datetime = confirmation_datetime

        confirm_an_appointment = ConfirmedAppointment(appointment= confirmed_appointment, confirmation_datetime= a_datetime)

        self.confirmed_appointment_dao.persist(confirm_an_appointment)
        return confirm_an_appointment
# Instantiated services
from source.main.service.doctor_service import DoctorService
from source.main.service.patient_service import PatientService
from source.main.service.daysoff_service import DaysOffService
from source.main.service.appointment_service import AppointmentService, ConfirmedAppointmentsService
from source.main.service.user_service import UserService


patient_service = PatientService()
doctor_service = DoctorService()
daysoff_service = DaysOffService()
appointment_service = AppointmentService()
confirmed_appointments_service = ConfirmedAppointmentsService()
user_service = UserService()
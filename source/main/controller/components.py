
# Instantiated services

from source.main.service.doctor_service import DoctorService
from source.main.service.patient_service import PatientService
from source.main.service.daysoff_service import DaysOffService


patient_service = PatientService()
doctor_service = DoctorService()
daysoff_service = DaysOffService()
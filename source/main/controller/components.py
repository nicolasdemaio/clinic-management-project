
# Instantiated services

from source.main.service.doctor_service import DoctorService
from source.main.service.patient_service import PatientService


patient_service = PatientService()
doctor_service = DoctorService()
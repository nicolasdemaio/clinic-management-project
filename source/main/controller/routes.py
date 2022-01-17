from source.main.controller.doctor_controller import *
from source.main.controller.patient_controller import *

def initialize_routes(api):
 api.add_resource(PatientsApi, '/api/patients')
 api.add_resource(PatientApi, '/api/patients/<id>')
 api.add_resource(DoctorsApi, '/api/doctors')
 api.add_resource(DoctorApi, '/api/doctors/<id>')
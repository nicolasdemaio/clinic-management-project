from source.main.controller.doctor_controller import *
from source.main.controller.patient_controller import *
from source.main.controller.daysoff_controller import *
from source.main.controller.appointment_controller import *

def initialize_routes(api):
 api.add_resource(PatientsApi, '/api/patients')
 api.add_resource(PatientApi, '/api/patients/<id>')
 api.add_resource(DoctorsApi, '/api/doctors')
 api.add_resource(DoctorApi, '/api/doctors/<id>')
 api.add_resource(DaysOffApi, '/api/doctors/daysoff')
 api.add_resource(ADayOffApi, '/api/doctors/daysoff/<id>')
 api.add_resource(AppointmentsApi, '/api/appointment')
 api.add_resource(AppointmentApi, '/api/appointment/<id>')
 api.add_resource(ConfirmedAppointmentsApi, '/api/appointment/confirmed')
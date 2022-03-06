from source.main.controller.doctor_controller import *
from source.main.controller.patient_controller import *
from source.main.controller.daysoff_controller import *
from source.main.controller.appointment_controller import *
from source.main.controller.receptionist_controller import *
from source.main.controller.user_controller import *

def initialize_routes(api):
 api.add_resource(UsersApi, '/api/users')
 api.add_resource(UserApi, '/api/users/<id>')
 api.add_resource(UserLoginApi, '/api/login')

 api.add_resource(PatientsApi, '/api/patients')
 api.add_resource(PatientApi, '/api/patients/<id>')

 api.add_resource(DoctorsApi, '/api/doctors')
 api.add_resource(DoctorApi, '/api/doctors/<id>')
 api.add_resource(DaysOffApi, '/api/doctors/daysoff')
 api.add_resource(ADayOffApi, '/api/doctors/daysoff/<id>')

 api.add_resource(AppointmentsApi, '/api/appointments')
 api.add_resource(AppointmentApi, '/api/appointments/<id>')
 api.add_resource(ConfirmedAppointmentsApi, '/api/appointments/confirmed')

 api.add_resource(ReceptionistsUserApi, '/api/receptionists')
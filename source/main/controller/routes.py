from source.main.controller.patient_controller import PatientsApi

def initialize_routes(api):
 api.add_resource(PatientsApi, '/api/patients')
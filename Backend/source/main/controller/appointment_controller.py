from datetime import datetime
from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import appointment_as_json, confirmed_appointment_as_json
from source.main.controller.components import appointment_service, confirmed_appointments_service

class AppointmentsApi(Resource):

    def get(self):
        appointments = appointment_service.get_appointments()
        return list_json_response(appointments, appointment_as_json, 200)
    
    def post(self): 
        a_registration_draft = AppointmentRegistrationDraft(request.get_json())
        created_appointment = appointment_service.create_a_appointment_using(a_registration_draft)
        return appointment_as_json(created_appointment), 201

class AppointmentApi(Resource):

    def get(self, id):
        appointment = appointment_service.get_appointment_by_id(id)
        return appointment_as_json(appointment), 200
    
    def delete(self, id):
        appointment_service.delete_appointment_by_id(id)
        return 200
        
class AppointmentRegistrationDraft:

    def __init__(self, a_json):
        self.doctor_id = a_json['doctor_id']
        self.patient_id = a_json['patient_id']
        self.datetime = datetime.fromisoformat(a_json['datetime'])


class ConfirmedAppointmentsApi(Resource):

    def get(self):
        confirmed_appointments = confirmed_appointments_service.get_confirmed_appointments()
        return list_json_response(confirmed_appointments, confirmed_appointment_as_json, 200)
    
    def post(self): 
        body = request.get_json()
        appointment_id = body["appointment_id"]
        confirmation_datetime = datetime.fromisoformat(body['datetime'])
        confirmed_appointment = confirmed_appointments_service.confirm_an_appointment_with(appointment_id,confirmation_datetime)
        return confirmed_appointment_as_json(confirmed_appointment), 201


def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response
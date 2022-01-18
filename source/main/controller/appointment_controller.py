from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import appointment_as_json
from source.main.controller.components import appointment_service
from source.main.model.appointment import Appointment

class AppointmentsApi(Resource):

    def get(self):
        appointments = appointment_service.get_appointments()
        return list_json_response(appointments, appointment_as_json, 200)
    
    def post(self): 
        body = request.get_json()
        appointment = Appointment(**body)
        appointment_service.create_a_appointment(appointment)
        return appointment_as_json(appointment), 201

class AppointmentApi(Resource):

    def get(self, id):
        appointment = appointment_service.get_appointment_by_id(id)
        return appointment_as_json(appointment), 200
    
    def delete(self, id):
        appointment_service.delete_appointment_by_id(id)
        return 200
    
    def put(self, id):
        updated_appointment_data = request.get_json()
        updated_appointment = appointment_service.update_appointment_by_id(id, updated_appointment_data)
        return appointment_as_json(updated_appointment), 200
        
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response

# TODO: PARA PODER PROBAR
# {
# 	"doctor": {
# 		"fullname" : "Rodrigo Iglesias",
# 		"document" : {
# 				"document_type" : "DNI",
# 				"number" : 42575871
# 		},
# 		"address" : "Madame Curie 1070",
# 		"phonenumber" : 12345,
# 		"email" : "riglesias@test.com",
# 		"birthdate" : "2020-05-17 00:00:00",
# 		"registration_date" : "2022-01-16 02:43:00",
# 		"time_interval_off" : {
# 				"from_date" : "2022-01-16 02:43:00",
# 				"to_date" : "2022-01-16 03:13:00"
# 		}
# 	},
# 	"patient": {
# 		"fullname" : "Rodrigo Iglesias",
# 		"document" : {
# 				"document_type" : "DNI",
# 				"number" : 42575871
# 		},
# 		"address" : "Madame Curie 1070",
# 		"phonenumber" : 12345,
# 		"email" : "riglesias@test.com",
# 		"birthdate" : "2020-05-17 00:00:00"
# 	},
# 	"time_range" : {
# 		"from_date" : "2022-01-16 02:43:00",
# 		"to_date" : "2022-01-16 03:13:00"
# 	},
# 	"time_interval" : {
# 				"from_date" : "2022-01-16 02:43:00",
# 				"to_date" : "2022-01-16 03:13:00"
# 		}
# }
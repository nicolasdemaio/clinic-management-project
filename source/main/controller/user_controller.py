from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import patient_as_json
from source.main.controller.components import patient_service
from source.main.model.patient import Patient
#! FALTA TOCAR ACA TODO
class UsersApi(Resource):

    def get(self):
        patients = patient_service.get_patients()
        return list_json_response(patients, patient_as_json, 200)
    
    def post(self): 
        body = request.get_json()
        patient = Patient(**body)
        patient_service.create_a_patient(patient)
        return patient_as_json(patient), 201

class UserApi(Resource):

    def get(self, id):
        patient = patient_service.get_patient_by_id(id)
        return patient_as_json(patient), 200
    
    def delete(self, id):
        patient_service.delete_patient_by_id(id)
        return 200
    
    def put(self, id):
        updated_patient_data = request.get_json()
        updated_patient = patient_service.update_patient_by_id(id, updated_patient_data)
        return patient_as_json(updated_patient), 200
        
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response
from flask_restful import Resource
from flask import Response, jsonify, request
from source.main.controller.basic_structures import patient_as_json
from source.main.controller.components import patient_service

class PatientsApi(Resource):

    def get(self):
        patients = patient_service.get_patients()
        return list_json_response(patients, patient_as_json, 200)

def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response

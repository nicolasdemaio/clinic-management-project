from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import doctor_as_json
from source.main.controller.components import doctor_service
from source.main.model.doctor import Doctor

class DoctorsApi(Resource):

    def get(self):
        doctors = doctor_service.get_doctors()
        return list_json_response(doctors, doctor_as_json, 200)
    
    def post(self): 
        body = request.get_json()
        doctor = Doctor(**body)
        doctor_service.create_a_doctor(doctor)
        return doctor_as_json(doctor), 201

class DoctorApi(Resource):

    def get(self, id):
        doctor = doctor_service.get_doctor_by_id(id)
        return doctor_as_json(doctor), 200
    
    def delete(self, id):
        doctor_service.delete_doctor_by_id(id)
        return 200
    
    def put(self, id):
        updated_doctor_data = request.get_json()
        updated_doctor = doctor_service.update_doctor_by_id(id, updated_doctor_data)
        return doctor_as_json(updated_doctor), 200
        
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response

# class PatientDraft:

#     def __init__(a_json):
#         self.fullname : a_json.fullname,
#         self.document : document_as_json(a_json.document),
#         self.birthdate : a_json.birthdate,
#         self.address : a_json.address,
#         self.phonenumber :a_json.phonenumber,
#         self.email : a_json.email

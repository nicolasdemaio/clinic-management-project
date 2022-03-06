from datetime import datetime
from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import days_off_as_json
from source.main.controller.components import daysoff_service
from source.main.model.days_off import DaysOffRequest
from source.main.model.time_interval import TimeInterval
from source.tool.custom_logger import Logger


class DaysOffApi (Resource):

    def get(self):
        days_off = daysoff_service.get_days_offs()
        return list_json_response(days_off, days_off_as_json, 200)
    
    def post(self): 
        days_off_request_draft = DaysOffRequestDraft(request.get_json())
        registered_days_off = daysoff_service.create_a_days_off_using(days_off_request_draft)
        return days_off_as_json(registered_days_off), 201

class ADayOffApi(Resource):

    def get(self, id):
        days_off = daysoff_service.get_days_off_by_id(id)
        return days_off_as_json(days_off), 200
    
    def delete(self, id):
        daysoff_service.delete_days_off_by_id(id)
        return 200
    
    def put(self, id):
        updated_days_off_data = request.get_json()
        updated_days_off = daysoff_service.update_days_off_by_id(id, updated_days_off_data)
        return days_off_as_json(updated_days_off), 200
        
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response

class DaysOffRequestDraft:

    def __init__(self, a_json):
        from_date = datetime.fromisoformat(a_json["time_range"]['from_date'])
        to_date = datetime.fromisoformat(a_json["time_range"]['to_date'])

        self.doctor_id = a_json['doctor_id']
        self.reason = a_json['reason']
        self.time_range = TimeInterval.create_starting(from_date, to_date)
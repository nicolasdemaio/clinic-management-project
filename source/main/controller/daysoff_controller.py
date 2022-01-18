from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import days_off_as_json
from source.main.controller.components import daysoff_service
from source.main.model.days_off import DaysOffRequest
from source.tool.custom_logger import CustomLogger


class DaysOffApi (Resource):

    def get(self):
        days_off = daysoff_service.get_days_off()
        return list_json_response(days_off, days_off_as_json, 200)
    
    def post(self): 
        CustomLogger().get_configured_instance().info("Llegue al inicio")
        body = request.get_json()
        days_off = DaysOffRequest(**body) #! ACA NO RETORNA NADA LA VERGA || object() takes no parameters || ABAJO DE TODO DE DEJO LA BASE
        CustomLogger().get_configured_instance().info(days_off)
        daysoff_service.create_a_days_off(days_off)
        CustomLogger().get_configured_instance().info("Llegue al final")
        return days_off_as_json(days_off), 201

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
# 	"time_range" : {
# 		"from_date" : "2022-01-16 02:43:00",
# 		"to_date" : "2022-01-16 03:13:00"
# 	},
# 	"reason": "A logical and explained reason",
# 	"datetime_of_request" : "2020-05-17 00:00:00"
# }
from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import user_as_json
from source.main.controller.components import user_service
from source.main.service.user_service import UserAuthenticationException


class UsersApi(Resource):

    def get(self): 
        users = user_service.get_users()
        return list_json_response(users, user_as_json, 200)
    

class UserApi(Resource):

    def get(self, id):
        user = user_service.get_user_by_id(id)
        return user_as_json(user), 200
    
    def delete(self, id):
        user_service.delete_user_by_id(id)
        return 200
        
    def put(self, id):
        updated_user_data = request.get_json()
        updated_user = user_service.update_user_by_id(id, updated_user_data)
        return user_as_json(updated_user), 200

class AuthenticationApi(Resource):

    def post(self):
        body = request.get_json()
        username = body['username']
        password = body['password']

        try:
            logged_user = user_service.login(username, password)
            token = token()

            return logged_user, token, 200
        except UserAuthenticationException as error:
            response = jsonify({'error' : str(error)})
            response.status_code = 401
            response.mimetype = 'application/json'
            return response

    
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response

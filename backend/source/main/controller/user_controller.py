from click import decorators
from flask_restful import Resource
from flask import jsonify, request
from source.main.controller.basic_structures import user_as_json
from source.main.controller.components import user_service
from source.main.controller.utilities import rol_required
from source.main.service.user_service import UserAuthenticationException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


class UsersApi(Resource):

    decorators = [jwt_required(), rol_required(['ADMIN'])]

    def get(self): 
        users = user_service.get_users()
        return list_json_response(users, user_as_json, 200)
    

class UserApi(Resource):

    decorators = [jwt_required(), rol_required(['ADMIN'])]

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

class UserLoginApi(Resource):

    def post(self):
        body = request.get_json()
        username = body['username']
        password = body['password']

        try:
            logged_user = user_service.login(username, password)
            token = 'Bearer ' + create_access_token(identity = username)

            return user_as_json(logged_user), 200, {"Authorization": token}
        except UserAuthenticationException as error:
            response = jsonify({'error' : str(error)})
            response.status_code = 401
            response.mimetype = 'application/json'
            return response
        except:
            return {'error' : 'Does not exist user with gaven name.'}, 400
    
def list_json_response(a_list_of_objects, a_mapper_method, an_status_code):
    mapped_objects = list(map(a_mapper_method, a_list_of_objects))
    response = jsonify({'data' : mapped_objects})
    response.status_code = an_status_code
    response.mimetype = 'application/json'
    return response
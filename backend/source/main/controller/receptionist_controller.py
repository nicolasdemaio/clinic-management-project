from source.main.controller.components import user_service
from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from source.main.controller.utilities import rol_required


class ReceptionistsUserApi(Resource):

    decorators = [jwt_required(), rol_required(['ADMIN'])]

    def post(self): 
        body = request.get_json()
        fullname = body['fullname']
        dni = body['dni']
        user_service.create_account_with(fullname, dni, ['RECEPTIONIST'])

        response = jsonify({'action' : 'Receptionist created'})
        response.status_code = 201
        response.mimetype = 'application/json'
        return response
    
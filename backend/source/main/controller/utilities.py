from re import A
from source.main.model.user import User
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from functools import wraps

def get_authenticated_user():
    verify_jwt_in_request()

    username = get_jwt_identity()
    obtained_user = User.objects().get(username=username)
    return obtained_user

def rol_required(a_list_of_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()

            if get_authenticated_user().belongs_to(a_list_of_roles):
                return fn(*args, **kwargs)
            else:
                response = jsonify({'error' : 'A role is required.'})
                response.status_code = 403
                response.mimetype = 'application/json'
                return response

        return decorator
    return wrapper

def get_authenticated_user():
    verify_jwt_in_request()

    username = get_jwt_identity()
    obtained_user = User.objects().get(username=username)
    return obtained_user




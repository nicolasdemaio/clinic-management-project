from flask import Flask
from flask_restful import Api
from configuration import perform_database_connection
from source.main.controller.routes import initialize_routes
from flask_jwt_extended import *

app = Flask(__name__)
api = Api(app)

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

initialize_routes(api)
perform_database_connection()

#? Referencias: (FALTA TOCAR)
#? https://pythonhosted.org/Flask-JWT/
#? https://youtu.be/ZDJ5hjxcDAk

if __name__ == "__main__":
    app.run(debug=True)
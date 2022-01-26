from flask import Flask
from flask_restful import Api
from configuration import perform_database_connection
from source.main.controller.routes import initialize_routes
from flask_jwt_extended import *
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

CORS(app, expose_headers='Authorization', allow_headers=["Content-Type", "Authorization", \
    "Access-Control-Allow-Credentials"], supports_credentials=True)

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

initialize_routes(api)
perform_database_connection()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
from flask import Flask
from flask_restful import Api
from configuration import perform_database_connection
from source.main.controller.routes import initialize_routes
from flask_jwt import JWT, jwt_required, current_identity
from source.main.service.user_service import authenticate, identity

app = Flask(__name__)
api = Api(app)

initialize_routes(api)
perform_database_connection()

#? Referencias: (FALTA TOCAR)
#? https://pythonhosted.org/Flask-JWT/
#? https://youtu.be/ZDJ5hjxcDAk

jwt = JWT(app, authenticate, identity)

@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity

if __name__ == "__main__":
    app.run(debug=True)
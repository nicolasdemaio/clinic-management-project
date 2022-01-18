from flask import Flask
from flask_restful import Api
from configuration import perform_database_connection
from source.main.controller.routes import initialize_routes

app = Flask(__name__)
api = Api(app)

initialize_routes(api)
perform_database_connection()


if __name__ == "__main__":
    app.run(debug=True)
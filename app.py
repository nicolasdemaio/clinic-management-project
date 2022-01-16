from flask import Flask
from flask_restful import Api
from configuration import perform_database_connection
from source.main.controller.routes import initialize_routes

app = Flask(__name__)
api = Api(app)

initialize_routes(api)
perform_database_connection()

###

def ObjectToJson(objects):
    dictionary = {}
    for atributo in objects:
        if atributo == 'document':
            dictionary.update({'document':{
                "document_type" : objects.document.document_type,
                "number" : objects.document.number
            }})
        elif atributo == 'id':
            dictionary.update({atributo:str(objects.id)})
        else:
            dictionary.update({atributo:objects[atributo]})
    return dictionary

if __name__ == "__main__":
    app.run(debug=True)
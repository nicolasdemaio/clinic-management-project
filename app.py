from datetime import date, datetime
from typing import Collection
from wsgiref import headers
from flask import Flask, jsonify, Response
import pymongo

from source.model.patient import Patient

app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)

client = pymongo.MongoClient("mongodb+srv://root:lastoninas@clinic-management-datab.2df7e.mongodb.net/testDB?retryWrites=true&w=majority")
db = client.testDB
collection = db['test-collection']

@app.route('/')
def index():
    #x = collection.insert_one({"hola":"recibido"}).inserted_id
    #return str(x)
    return 'Hesllo!'

@app.route('/patient')
def get_patients():
    patients = [
        {"asd":"asd"},
        {"asd":"assd"}
    ]
    
    ajson = jsonify(
        patients
    )

    #return ajson, 200, {'Authorization':'testasd'}

    return Response(ajson).OK
# Ta bien asi? o es al pedo hacer asi los responses de las peticiones?
# Me parecio mas lindo que envies solo el body y el .OK o .BAD de tu respuesta, pero nuse 🙃


#-------------------------
import base64 # Codificador y Deco para Keys

token = "Esto es mi token?" # Mensaje en base64
token_encoded = token.encode('utf-8') 
base64_token = base64.b64encode(token_encoded) # Mensaje codeado en 64bytes
base64_message = base64_token.decode('utf-8') # Vuelve a ser mi token string

#  o todo en un chori
# token = "Esto es mi token?"
# token_encoded = base64.b64encode(token).encode('utf-8')
# token_decoded = base64.b64encode(token).decode('utf-8')
#-------------------------

# Clase encargada de los respones basicos
class Response():
    def __init__(self,body="",token=base64_token):
        auth = {'Authorization':token}
        self.OK = (body,200,auth)
        self.BAD = (body,400,auth)
        self.METOD = (body,405,auth)
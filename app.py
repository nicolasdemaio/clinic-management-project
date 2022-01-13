from datetime import date, datetime
from typing import Collection
from wsgiref import headers
from flask import Flask, jsonify, Response
import pymongo

from source.model.patient import Patient

app = Flask(__name__)

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

    return ajson, 200, {'Authorization':'testasd'}
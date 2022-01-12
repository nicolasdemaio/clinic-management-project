from typing import Collection
from flask import Flask
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://root:lastoninas@clinic-management-datab.2df7e.mongodb.net/testDB?retryWrites=true&w=majority")
db = client.testDB
collection = db['test-collection']

@app.route('/')
def index():
    x = collection.insert_one({"hola":"recibido"}).inserted_id
    return str(x)
    
if (__name__ == "__main__"):
    app.run(debug=True)
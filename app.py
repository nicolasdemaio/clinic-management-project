from flask import Flask
from source.main.controller.basic_structures import appointment_as_json
from source.main.model.appointment import Appointment
from source.main.model.doctor import Doctor
from source.main.model.time_interval import TimeInterval
from source.tool.custom_logger import CustomLogger
from mongoengine import *
from source.main.model.document import IdentityDocument
from source.main.model.patient import Patient
from datetime import date, datetime

user = "root"
password = "lastoninas"
database = "testDB"
db = connect(host=f"mongodb+srv://{user}:{password}@clinic-management-datab.2df7e.mongodb.net/{database}?retryWrites=true&w=majority")
logger = CustomLogger("demolog", "logs")
app = Flask(__name__)

a_birthdate = date(2020, 5, 17)
a_document = IdentityDocument(document_type='DNI', number='42575871')

@app.route('/')
def index():
    return 'Hello!'

@app.route('/paciente', methods=['GET'])
def traer():

    time_interval = TimeInterval.create_with_time_adding_minutes(datetime.now(), 30)

    a_patient = Patient(
        fullname='Rodrigo Iglesias',
        document=a_document,
        address='Madame Curie 363',
        phonenumber=12345,
        email='riglesias@test.com',
        birthdate=a_birthdate
    ).save()
    
    a_doctor = Doctor(
        fullname = 'Rodrigo Iglesias',
        document = a_document,
        address = 'Madame Curie 363',
        phonenumber = 12345,
        email = 'riglesias@test.com',
        birthdate = a_birthdate,
        registration_date = datetime.now(),
        time_interval_off = time_interval
    ).save()
    
    starting_date = datetime.today()

    appointment = Appointment.create_for(a_patient=a_patient, a_doctor=a_doctor, a_datetime=starting_date)
    appointment.save()
    
    return appointment_as_json(appointment)






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
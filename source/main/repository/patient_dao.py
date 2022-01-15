from source.main.model.patient import Patient
import pymongo

class PatientDAO:

    def __init__(self):
        database_user = 'root'
        database_password = 'lastoninas'
        database_server = 'mongodb+srv'
        database_name = 'testDB'
        database_url = database_server + '://' + database_user + ':' + database_password + '@clinic-management-datab.2df7e.mongodb.net/' + database_name + '?retryWrites=true&w=majority'
        
        client = pymongo.MongoClient(database_url)
    
        self.collection = client.testDB['patients']

    def persist(self, a_patient):
        return self.collection.insert_one({'fullname' : a_patient.fullname})

    def get_by_id(self, an_object_id) -> Patient:
        return self.collection.find_one({"_id": an_object_id})
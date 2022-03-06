from mongoengine import *

def perform_database_connection():
    user = "root"
    password = "lastoninas"
    database = "testDB"
    connect(host=f"mongodb+srv://{user}:{password}@clinic-management-datab.2df7e.mongodb.net/{database}?retryWrites=true&w=majority")

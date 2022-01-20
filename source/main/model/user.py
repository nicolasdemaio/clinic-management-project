from mongoengine import *

class User(Document):

        id = StringField(required=True)
        username = StringField(required=True)
        password = StringField(required=True)
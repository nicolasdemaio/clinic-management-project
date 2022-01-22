from mongoengine import *

class User(Document):

        username = StringField(required=True)
        password = StringField(required=True)
        dni = IntField(required=True)
        roles = ListField(StringField(required=True))

        def is_receptionist(self):
                return self.roles.includes('RECEPTION')

        def is_doctor(self):
                return self.roles.includes('DOCTOR')

        def is_admin(self):
                return self.roles.includes('ADMIN')

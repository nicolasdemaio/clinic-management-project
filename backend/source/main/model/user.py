from mongoengine import *

class User(Document):

        username = StringField(required=True)
        password = StringField(required=True)
        dni = IntField(required=True)
        roles = ListField(StringField(required=True))

        def belongs_to(self, a_list_of_roles):
                for a_rol in a_list_of_roles:
                        if (a_rol in self.roles):
                                return True
                return False
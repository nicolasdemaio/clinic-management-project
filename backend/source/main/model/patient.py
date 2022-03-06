from mongoengine import *
from source.main.model.identity_document import IdentityDocument

class Patient(Document):

    fullname = StringField(required=True)
    document = EmbeddedDocumentField(IdentityDocument)
    address = StringField(required=True)
    phonenumber = IntField(required=True)
    email = EmailField(required=True)
    birthdate = DateField(required=True)
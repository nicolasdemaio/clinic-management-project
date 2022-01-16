from mongoengine import *

class IdentityDocument(EmbeddedDocument):

    document_type = StringField(required=True)
    number = IntField(required=True)
        


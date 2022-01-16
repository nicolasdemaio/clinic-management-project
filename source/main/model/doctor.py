from mongoengine import *
from datetime import datetime
from source.main.model.document import IdentityDocument
from source.main.model.time_interval import TimeInterval


class Doctor(Document):

    fullname = StringField(required=True)
    document = EmbeddedDocumentField(IdentityDocument)
    address = StringField(required=True)
    phonenumber = IntField(required=True)
    email = EmailField(required=True)
    birthdate = DateField(required=True)
    registration_date = DateTimeField(default=datetime.now(), required=True)
    time_interval_off = EmbeddedDocumentField(default=None, document_type=TimeInterval)

    def is_working(self, ask_date=datetime.today()):
        if self.time_interval_off is None:
            return True
        elif (ask_date.weekday() > 4) or self.time_interval_off.includes(ask_date):
            return False
from mongoengine import *
from source.main.model.doctor import Doctor
from source.main.model.time_interval import TimeInterval

class DaysOffRequest:

    doctor = ReferenceField(Doctor)
    time_range = EmbeddedDocumentField(TimeInterval)
    reason = StringField(required=True)
    datetime_of_request = DateTimeField(required=True)




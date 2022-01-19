from http.client import PROXY_AUTHENTICATION_REQUIRED
from mongoengine import *
from source.main.model.doctor import Doctor
from source.main.model.time_interval import TimeInterval

class DaysOffRequest(Document):

    doctor = ReferenceField(Doctor)
    time_range = EmbeddedDocumentField(TimeInterval)
    reason = StringField(required=True)
    datetime_of_request = DateTimeField(required=True)

# **Un estado entre Pendiente-Aceptado-Rechazado
# !Razon de negacion en el caso de negar
# ?Quien acepto/rechazo

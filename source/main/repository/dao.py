import bson
from abc import ABC, abstractmethod
from source.main.model.patient import Patient
from source.main.model.doctor import Doctor
from source.main.model.days_off import DaysOffRequest
from source.main.model.appointment import Appointment

class AbstractDAO(ABC):

    def persist(self, an_object):
        self.persistent_class().save(an_object)

    def get_all(self):
        return self.persistent_class().objects().all()
    
    def get_by_id(self, an_id):
        return self.persistent_class().objects().get(id=bson.objectid.ObjectId(an_id))

    def delete_by_id(self, an_id):
        self.get_by_id(an_id).delete()
    
    def update_by_id(self, an_id, updated_patient_data):
        self.get_by_id(an_id).update(**updated_patient_data)
        updated_patient = self.get_by_id(an_id)
        return updated_patient

    @abstractmethod
    def persistent_class(self):
        raise NotImplementedError("Implement this method on all subclasses.")

class PatientDAO(AbstractDAO):

    def persistent_class(self):
        return Patient

class DoctorDAO(AbstractDAO):

    def persistent_class(self):
        return Doctor
        
class DaysOffDAO(AbstractDAO):

    def persistent_class(self):
        return DaysOffRequest

class AppointmentDAO(AbstractDAO):

    def persistent_class(self):
        return Appointment
        

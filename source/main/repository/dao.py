from abc import ABC, abstractmethod
from source.main.model.patient import Patient
from source.main.model.doctor import Doctor

class AbstractDAO(ABC):

    def persist(self, an_object):
        self.persistent_class().save(an_object)

    def get_all(self):
        return self.persistent_class().objects().all()

    @abstractmethod
    def persistent_class(self):
        raise NotImplementedError("Implement this method on all subclasses.")

class PatientDAO(AbstractDAO):

    def persistent_class(self):
        return Patient

class DoctorDAO(AbstractDAO):

    def persistent_class(self):
        return Doctor
        
        
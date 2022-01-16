from source.main.model.patient import Patient

class PatientDAO:

    def persist(self, a_patient):
        return 1

    def get_patients(self):
        return Patient.objects().all()
        
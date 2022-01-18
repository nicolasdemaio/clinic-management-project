from datetime import datetime
from source.main.model.appointment import Appointment
from source.main.model.time_interval import TimeInterval
from source.test.test_supporter import TestSupporter

class TestAppointment(TestSupporter):

    def test_an_appointment_is_created_correctly(self):
        # Setup
        starting_date = datetime.today()

        a_patient = self.new_patient()
        a_doctor = self.new_doctor()

        an_appointment = Appointment.create_for(a_patient, a_doctor, starting_date)

        # Assert
        assert an_appointment.patient == a_patient
        assert an_appointment.doctor == a_doctor
        assert an_appointment.time_interval == TimeInterval.create_with_time_adding_minutes(starting_date, 30)



        
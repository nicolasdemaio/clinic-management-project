from operator import methodcaller
import unittest
from datetime import datetime, timedelta
from source.model.appointment import Appointment
#from source.model import *
from source.model.logger import *
from source.model.utilities import TimeInterval

class TestAppointment(unittest.TestCase):

    def test_an_appointment_is_created_correctly(self):
        # Setup
        Logger.info('Que onda pa')
        starting_date = datetime.today()
        a_patient = 'Rodrigo Iglesias'
        a_doctor =  'Nicolas De maio'
        an_appointment = Appointment(a_patient, a_doctor, starting_date)


        Logger.warning(an_appointment)

        # Assert
        assert a_patient == 'Rodrigo Iglesias'
        assert a_doctor == 'Nicolas De maio'
        assert an_appointment.time_interval == TimeInterval(starting_date, (starting_date + timedelta(seconds=30 * 60 * 60)))



        
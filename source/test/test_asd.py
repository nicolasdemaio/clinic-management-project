from datetime import date, datetime
import unittest
from source.main.model.doctor import Doctor

from source.main.model.document import IdentityDocument
from source.main.model.time_interval import TimeInterval

class TestASD(unittest.TestCase):

    def test_tuputadmadre(self):

        a_birthdate = date(2020, 5, 17)
        a_document = IdentityDocument(document_type='DNI',number='42575871')
        time_interval = TimeInterval.create_with_time_adding_minutes(datetime.now(), 30)
        
        a_patient = Doctor(
            fullname = 'Rodrigo Iglesias',
            document = a_document,
            address = 'Madame Curie 363',
            phonenumber = 12345,
            email = 'riglesias@test.com',
            birthdate = a_birthdate,
            registration_date = datetime.now(),
            time_interval_off = time_interval
            )
            
        response = a_patient.is_working(datetime.today())

        assert response == False

    
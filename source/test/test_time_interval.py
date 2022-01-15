import unittest
from datetime import datetime

from source.main.model.time_interval import *

class TestTimeInterval(unittest.TestCase):

    def test_a_time_interval_is_created_correctly(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        time_interval = TimeInterval(from_date, to_date)

        assert time_interval.from_date == from_date
        assert time_interval.to_date == to_date
    
    def test_time_interval_includes_a_date(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        an_included_date = datetime(2021, 3, 5)

        time_interval = TimeInterval(from_date, to_date)

        assert time_interval.includes(an_included_date)

    def test_time_interval_does_not_includes_a_date(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        not_included_date = datetime(2021, 4, 2)

        time_interval = TimeInterval(from_date, to_date)

        self.assertFalse(time_interval.includes(not_included_date))

    def test_time_interval_cannot_be_created_with_a_start_date_major_than_end_date(self):
        with self.assertRaises(TimeIntervalException) as context:
            from_date = datetime(2021, 3, 10)
            to_date = datetime(2021, 3, 2)
            TimeInterval(from_date, to_date)
        
        self.assertTrue('The initial date should be before the final date' in str(context.exception))

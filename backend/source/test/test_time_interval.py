from datetime import datetime

from source.main.model.time_interval import *
from source.test.test_supporter import TestSupporter

class TestTimeInterval(TestSupporter):

    def test_a_time_interval_is_created_correctly(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        time_interval = TimeInterval.create_starting(from_date, to_date)

        assert time_interval.from_date == from_date
        assert time_interval.to_date == to_date
    
    def test_time_interval_includes_a_date(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        an_included_date = datetime(2021, 3, 5)

        time_interval = TimeInterval.create_starting(from_date, to_date)

        assert time_interval.includes(an_included_date)

    def test_time_interval_does_not_includes_a_date(self):
        from_date = datetime(2021, 3, 4)
        to_date = datetime(2021, 3, 10)

        not_included_date = datetime(2021, 4, 2)

        time_interval = TimeInterval.create_starting(from_date, to_date)

        self.assertFalse(time_interval.includes(not_included_date))

    def test_time_interval_cannot_be_created_with_a_start_date_major_than_end_date(self):
        with self.assertRaises(TimeIntervalException) as context:
            from_date = datetime(2021, 3, 10)
            to_date = datetime(2021, 3, 2)
            TimeInterval.create_starting(from_date, to_date)
        
        self.assertTrue('The initial date should be before the final date' in str(context.exception))

    def test_can_create_a_time_interval_with_an_initial_date_and_adding_an_amount_of_minutes(self):
        from_date = datetime(2021, 3, 10, 5, 0)
        final_date = datetime(2021, 3, 10, 5, 30)
        
        created_time_interval = TimeInterval.create_with_time_adding_minutes(from_date, 30)
        
        self.assertEquals(from_date, created_time_interval.from_date)
        self.assertEquals(final_date, created_time_interval.to_date)
   
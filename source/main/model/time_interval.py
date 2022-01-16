from mongoengine import *

from datetime import timedelta

class TimeInterval(EmbeddedDocument):
    
    from_date = DateTimeField(required=True)
    to_date = DateTimeField(required=True) 

    @classmethod
    def create_starting(cls, from_date, to_date):
        cls.__assert_can_be_created_with(from_date, to_date)
        return TimeInterval(from_date= from_date, to_date= to_date)

    @classmethod
    def create_with_time_adding_minutes(cls, a_datetime, an_amount_of_minutes=0):
        added_time = timedelta(minutes= an_amount_of_minutes)

        return cls.create_starting(a_datetime, (a_datetime + added_time))

    def includes(self, a_date):
        return (self.from_date <= a_date) and (self.to_date >= a_date)

    # Private methods

    @classmethod
    def __assert_can_be_created_with(cls, from_date, to_date):
        if (from_date > to_date):
                raise  TimeIntervalException('The initial date should be before the final date')

    def __eq__(self, an_object):
        return (
            (isinstance(an_object, TimeInterval)) 
            and (self.from_date == an_object.from_date) 
            and (self.to_date == an_object.to_date)
        )

class TimeIntervalException(RuntimeError):
    def __init__(self, *args: object):
        super().__init__(*args)


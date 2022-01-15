class TimeInterval:

    def __init__(self, from_date, to_date):
        self.__assert_can_be_created_with(from_date, to_date)
        self.from_date = from_date
        self.to_date = to_date

    def includes(self, a_date):
        return (self.from_date <= a_date) and (self.to_date >= a_date)

    # Private methods of TimeInterval

    def __eq__(self, an_object):
        return (
            (isinstance(an_object, TimeInterval)) 
            and (self.from_date == an_object.from_date) 
            and (self.to_date == an_object.to_date)
        )
       
    def __assert_can_be_created_with(self, from_date, to_date):
        if (from_date > to_date):
                    raise TimeIntervalException('The initial date should be before the final date')



class TimeIntervalException(RuntimeError):
    def __init__(self, *args: object):
        super().__init__(*args)


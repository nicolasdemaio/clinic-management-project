def patient_as_json(a_patient):
    return {
        "id" : str(a_patient.id),
        "fullname" : a_patient.fullname,
        "document" : document_as_json(a_patient.document),
        "birthdate" : a_patient.birthdate,
        "address" : a_patient.address,
        "phonenumber" :a_patient.phonenumber,
        "email" : a_patient.email
    }

def doctor_as_json(a_doctor):
    return {
        "id" : str(a_doctor.id),
        "fullname" : a_doctor.fullname,
        "document" : document_as_json(a_doctor.document),
        "birthdate" : a_doctor.birthdate,
        "address" : a_doctor.address,
        "phonenumber" :a_doctor.phonenumber,
        "email" : a_doctor.email,
        "registration_date" : a_doctor.registration_date,
        "time_interval_off" : time_interval_as_json(a_doctor.time_interval_off)
    }

def appointment_as_json(an_appointment):
    return {
        "id" : str(an_appointment.id),
        "patient" : patient_as_json(an_appointment.patient),
        "doctor" : doctor_as_json(an_appointment.doctor),
        "time_interval" : time_interval_as_json(an_appointment.time_interval)
    }

def confirmed_appointment_as_json(an_confirmed_appointment):
    return {
        "id" : str(an_confirmed_appointment.id),
        "appointment" : an_confirmed_appointment.appointment,
        "confirmation_datetime" : an_confirmed_appointment.confirmation_datetime
    }

def document_as_json(a_document):
    return {
        "document_type" : a_document.document_type,
        "number" : a_document.number
    }

def time_interval_as_json(a_time_interval):
    return {
        "from_date" : a_time_interval.from_date,
        "to_date" : a_time_interval.to_date
    }
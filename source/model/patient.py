# Objeto de dominio del problema.
# Representa un paciente, con todos sus datos
# Y el documento es un objeto de tipo Document (ver document.py)

class Patient:

    def __init__(self, firstname, lastname, document, address, phonenumber, email, birthdate):
        self.firstname = firstname
        self.lastname = lastname
        self.document = document
        self.address = address
        self.phonenumber = phonenumber
        self.email = email
        self.birthdate = birthdate

import unittest
from datetime import date, datetime, timedelta
from source.dao.patient_dao import PatientDAO
from source.model.appointment import Appointment
from source.model.document import Document
from source.model.patient import Patient

class TestPatientDAO(unittest.TestCase):

    # En este test estaba haciendo unas pruebas
    # De como se guardaria en base un paciente.
    # Despues vi que hay un framework/libreria que nos ayuda muchisimo.
    # Pero esta funcional (hasta ahí xdxd).

    def test_a_patient_can_be_persisted(self):
        #Setup
        a_birthdate = date(2020, 5, 17)
        a_document = Document('DNI','42575871')
        
        a_patient = Patient(
            fullname = 'Rodrigo Iglesias',
            document = a_document,
            address = 'Madame Curie 363',
            phonenumber = '12345',
            email = 'riglesias@test.com',
            birthdate = a_birthdate
            )

        # Esta clase es la encargada de consultas a BD, guardar objetos, traer, etc. 
        # (Leer abajo el texto explicativo)
        patient_dao = PatientDAO()

        #Excercise

        # Aca persisto al objeto y le pido el id con el que fue guardado
        persisted_patient_id = patient_dao.persist(a_patient).inserted_id

        # Aca lo busco en la bd con el id que se guardo
        obtained_patient = patient_dao.get_by_id(persisted_patient_id)

        #Assert

        #Y aca afirmo que el objeto que se guardo, tiene el mismo nombre que el que yo guarde.
        # para chequar que se guardo piola.
        assert obtained_patient['fullname'] == a_patient.fullname


# Pensando posibles soluciones de base.
# Suponiendo que quiero registrar un usuario, y que no este repido su email:

# Al patient_service le llega registrar_usuario('email')

# 1. solucion) Implementación de posible método

# if ( Patient.objects({email= 'email') != None ):
#   raise Error(existe usuario con ese email)

#  else:
#  Patient.save(nuevo paciente con ese email) 

# 2. solucion) Implementación de posible método, usando capa DAO (patient_dao)

# if ( patient_dao.exists_user_with_email('email) ):
#   raise Error(existe usuario con ese email)

#  else:
#  patient_dao.save(nuevo paciente con ese email) 

# Diferencias =
# Más clases si es usa DAO
# Más modularidad:
#   Sí el dia de mañana no quiero usar MongoDB y quiero usar una base que no tiene framework
#   crearia un DAO y reemplazaria a este en un pedo.
# Separación de responsabilidades:
# Si bien con el framework, la clase de modelo Patient,
# Está atado a la persistencia (porque hereda de Document, tiene atributos especiales, etc)
# La capa de DAO es la que nos abstrae de las consultas a la BD por así decirlo.
# Nuestro service no sabe como se hacen las consultas, sabe que si al dao le dice
# dame el paciente con este documento, te da el paciente con el documento.
# Si no existe el paciente, problema del DAO, no del service.
# El service o controller lo deberian handlear obvio, pero queda en el DAO que no lo tiene.

# Hay que pensar que es mejor en python tambien. =)
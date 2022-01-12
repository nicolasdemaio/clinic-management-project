import unittest

class TestPatient(unittest.TestCase):

    def test_suma_de_dos_numeros(self):
        # Setup
        numero1 = 1
        numero2 = 2

        # Excercise
        resultado = numero1 + numero2

        # Assert
        assert resultado == 3


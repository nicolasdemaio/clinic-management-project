# Representa un objeto Documento
# El cual sabemos que un documento en la vida real (la tarjeta física) tiene:
# Un tipo (DNI, DU, ...) y un número (ej: 42.312.772)

class Document:

    def __init__(self,a_document_type,a_document_number):
        self.type = a_document_type
        self.number = a_document_number

        


class UserController:
    
    #El controller recibe la orden de registrar
    #a través del método Http POST (para crear un usuario)
    #con un JSON que el cuerpo es algo como:
    # {
    #   username : "rodri",
    #   contraseña : "rodricapo1"
    # }
    def registrar(request):

        #Intenta en el try, registrar al usuario delegando la responsabilidad
        # del registro al UserService, y si esta todo bien, retorna codigo OK!
        try:
            UserService.registrarUsuario(request)
            return RespuestaJSON [Okey]

        #En el caso de fallar en el UserService, por ejemplo:
        # que el usuario ya este registrado, retorna codigo MAL!
        except:
            return RespuestaJSON [Mal, hubo un problema]


class UserService:

    #Este método es el usado en el UserController
    #Por ejemplo: se crea un usuario usando el Json de la Request (que tiene username y contraseña)
    def registrarUsuario(request):
        usuario = crearUsuarioUsando(request)

        # Aca podria, por ejemplo, fijarse si existe.
        #Si existe, entonces tira un error, que es atrapado en el try del UserController
        # .Mirar linea 20-21.
        if (existeUsuarioIgualA(usuario)):
            raise Error("Ya existe el usuario")

        #Si no hay problema, si el usuario no existe, lo guarda y registra en Base de Datos.
        else:
            usuario.save() # acá se persistiría en la Base de Datos.


#Esto es el simple objeto/clase de Usuario, que tiene su nombre y contraseña
#Que viene por JSON para justamente crear un usuario
class User:
    nombre
    contraseña


# Algo así es como sé que se separan responsabilidades y se organiza mejor un proyecto [hablando de Java].
# En python por lo que ví se puede adoptar esta forma, tengo que investigar y esta bueno para poner en práctica y probar.
# Espero que se entienda un poco mejor =)

# Pero la idea es:
# Controller toma peticiones y retorna respuestas HTTP, solo tiene que ver con eso.
# Service hace validaciones, tirá excepciones si debe (como en el ejemplo), crea objetos, etc.
# Objetos, representan lo que queremos modelar: Pacientes, médicos, recepcionistas, turnos.

# Ejemplo de un objeto SolicitudDeTurno:

# Una solicitud de turno sabemos que podría tener:
#     > Un paciente
#     > Un médico que lo va a atender
#     > Una fecha y horario de asistencia

# Trasladado a código sería algo como la siguiente clase

class SolicitudDeTurno:

    def __init__(self, unPaciente, unMedicoQueAtiende, unaFechaDeAtencion):
        self.pacienteSolicitador = unPaciente
        self.medico = unMedicoQueAtiende
        self.fechaParaTurno = unaFechaDeAtencion

# Y así se representaría en un objeto por ejemplo, una solicitud para un turno
# para un paciente, con un medico asignado, en una fecha dada.
# Por qué tantos parametros? Porque un turno es válido, si solo sí,
# tiene un paciente que solicita, un medico que va a atender y una fecha que se va a realizar.


 # Explicación: Request y Responses HTTP
 
 # Request = peticiones que se hacen a la API con un body ({json}) o por path (/api/{algún parametro})
    # y también puede mandar un header (ej: {token : "token"})
 # Responses = respuestas que se dan al consumidor de la API
    # contiene: Un body (json), un status code (200, 201, 404, ...) y puede un token (ej: autorización de usuario)

# Ejemplo de Autenticación de Usuario

# Request para logearse:
# Json({"username" : "rodri", "password" : "rodricapo1"}) 
# Manda la petición GET con el body de arriba al endpoint (por ejemplo): /api/users

# El controller que tenga el metodo /api/users va a verificar si existe el usuario que le llega
# por request, parseando el json a usuario (crea un usuario a partir del json = User(username, password))

# Si no existe > Retorna un response con codigo 400 (error) y un body indicando el error
# Ejemplo: {"error", "no existe un usuario con nombre dado"}

# Si existe, va a retornar:
# Codigo 200 OK
# Body > {"username" : "rodri", y más datos (sin la contraseña por seguridad)}
# Y un header Authorization con un token.

# El token que recibe, en React (por ejemplo), se lo guarda y eso es como su sesion.
# Y como ya lo tiene ,y es un token valido, las peticiones siguientes que haga
# Ya se sabe que es el por el token que tiene React, lo manda dentro de las request siguiente que se hagan.


# clinic-management-api
Clinic Management API

## Explanation

The objectives of this project are:
* Learn tools like:
    1. Python 
    2. Flask 
    3. MongoDB 
    4. Unit testing

* Work in pair (Pair programming & Agile)

## Ideas

Admin puede: 
    - hacer CRUD de pacientes.
    - hacer CRUD de doctores (y se crea una cuenta de user para estos)
    - cargar pedidos de turnos para un paciente, con un doctor asignado, en una fecha dada
    - confirmar asistencia a los turnos
    - confirmar/rechazar pedidos de inasistencias de doctores

Doctor puede:
    - hacer pedidos de inasistencias (en un rango de fechas, con una razon)
    - hacer CRUD de estudios para un paciente.
    - ver los turnos que se les tiene asignados sin confirmar.
    - ver los turnos que se le confirmaron.

Sin token se puede: (esto seria, sin ser admin/doctor, sin estar logeado)
    - ver estudios registrados de un paciente (con un tipo y numero de docuemnto dado)
    - ver turnos registrados de un paciente (con tip y numero de documento)

Validaciones:
    - no se puede registrar un paciente si ya existe uno con igual tipo y numero de documento 
    - doctor no puede solicitar inasistencia en un intervalo de tiempo que este incluido en un
       pedido ya hecho de si mismo en ese intervalo
       Ejemplo: pidió de 8/3 al 12/3, no puede pedir del 10/3 al 15/3 porque la fecha (de 10 a 12) ya estan pedidas por él.
    - Admin no puede registrar un paciente/doctor con un email en uso
    - No se puede registrar un turno para un paciente si:
        el doctor asignado ya tiene un turno solicitado entre ese intervalo de tiempo
        el paciente ya tiene un turno asignado en ese intervalo de tiempo
        el doctor asignado esta ausente
        
.tip: podria ser q doctor tenga lista de ausencias (aceptadas por el admin)
    y se itere sobre esas para saber si esta trabajando o no, inicialmente es vacio.
    que se le agregarian al doctor (la inasistencia confirmada) cuando es aceptada.

Posibles acciones:
    - al hacer un turno para cliente, que se le envie mail al cliente con la info del turno.
    - al cargar estudios para cliente, mandarle mail avisando que se le registro un nuevo estudio.

---

Podría ser que paciente y médico tenga registro de turnos solicitados.

paciente registrar_turno (doctor, fecha)
    if (self.tengo_turno_pedido_en fecha)
        Error
    else
        turno = Appointment(self, doctor, fecha)
        doctor.registrar_turno(turno)
        self.appointments.add(turno)
        return turno

doctor registrar_turno(turno)
    if (self tiene_turno_solicitado_en (fecha) or not self is working(turno.fecha))
        Error
    else
        self.appointments.add(turno)

y se haria afuera un turno.save() -> esto chequear si persiste el turno tanto en paciente como doctor
        

## Authors
* Rodrigo Iglesias
* Nicolas De Maio
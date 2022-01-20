import keyboard
import requests
import json
from custom_logger import Logger

class bcolors:
    RESET = '\033[0m'
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

base_url = "http://127.0.0.1:5000/"
logger = Logger.get("simulates", "logs")

def execute():
    input("Press enter to start")
    endpoint = str(input("Ingrese el endpoint del client: (ej: api/patients) - ")).lower()
    method = str(input("Ahora el metodo a utilizar: (ej: GET) - ")).upper() # , auth=('user', 'pass')

    complete_url = base_url + endpoint

    request = action_to_response(method,complete_url)

    print_results(request)

def action_to_response(method,complete_url):
    if method == 'GET':
        return requests.get(complete_url)
    elif method == 'DELETE':
        return requests.delete(complete_url)
    elif method == 'PUT':
        print("Ingrese su data: (Enter para finalizar o especifique su plantilla)")
        final_data, headers = console_to_json()
        try:
            return requests.put(complete_url,data=final_data, headers=headers)
        except:
            print(f"{bcolors.FAIL}FAIL TO CONNECT TO SERVER{bcolors.RESET}")
    elif method == 'POST':
        print("Ingrese su data: (Enter para finalizar o especifique su plantilla)")
        final_data, headers = console_to_json()
        try:
            return requests.post(complete_url,data=final_data, headers=headers)
        except:
            print(f"{bcolors.FAIL}FAIL TO CONNECT TO SERVER{bcolors.RESET}")

def print_results(request):
    try:
        print (f"{bcolors.WARNING}Status Code:{bcolors.RESET} {request.status_code}")
        print (f"{bcolors.WARNING}Json: {bcolors.RESET}") # .text
        print(json.dumps(request.json(), indent=4, sort_keys=True))

        logger.info("<----------------------------------------->")
        logger.info(f"Status Code: {request.status_code}")
        logger.info(f"Json: \n {json.dumps(request.json(), indent=4, sort_keys=True)}")

        print(f"{bcolors.OKGREEN}SUCCESSFUL{bcolors.RESET}")
    except:
        print(f"{bcolors.FAIL}FAIL{bcolors.RESET}")

def console_to_json():
    payload_list = []
    while not keyboard.is_pressed('enter'):
        line = str(input())
        payload_list.append(line)
    
    payload = str()
    for lists in payload_list:
        payload += lists
    if payload.lower() == "doctor":
        payload = doctor_template()
    elif payload.lower() == "patient":
        payload = patient_template()
    elif payload.lower() == "daysoff":
        payload = daysoff_template()
    elif payload.lower() == "appointment":
        payload = appointment_template()

    jsonifyed = json.loads(payload)
    headers = {'content-type': 'application/json'}
    return json.dumps(jsonifyed), headers

def doctor_template():
    return json.dumps(
        {
        "address": "Madame Curie 1070",
        "birthdate": "2020-05-17",
        "document": {
            "document_type": "DNI",
            "number": 42575871
        },
        "email": "doctor@template.com",
        "fullname": "Template Doctor",
        "id": "61e4e5e2b25ab9ae3b0c576e",
        "phonenumber": 12345,
        "registration_date": "2022-01-16 02:43:00",
        "time_interval_off": {
            "from_date": "2022-01-16 02:43:00",
            "to_date": "2022-01-16 03:13:00"
        }
    }
    )

def patient_template():
    return json.dumps(
        {
        "address": "Madame Curie 1070",
        "birthdate": "2020-05-17",
        "document": {
            "document_type": "DNI",
            "number": 42575871
        },
        "email": "patient@template.com",
        "fullname": "Template Patient",
        "phonenumber": 12345,
    }
    )

def daysoff_template():
    return json.dumps(
        {   
        "doctor": {
            "fullname" : "Template daysoff",
            "document" : {
                    "document_type" : "DNI",
                    "number" : 42575871
            },
            "address" : "Madame Curie 1070",
            "phonenumber" : 12345,
            "email" : "daysoff@template.com",
            "birthdate" : "2020-05-17 00:00:00",
            "registration_date" : "2022-01-16 02:43:00",
            "time_interval_off" : {
                    "from_date" : "2022-01-16 02:43:00",
                    "to_date" : "2022-01-16 03:13:00"
            }
        },
        "time_range" : {
            "from_date" : "2022-01-16 02:43:00",
            "to_date" : "2022-01-16 03:13:00"
        },
        "reason": "Template daysoff",
        "datetime_of_request" : "2020-05-17 00:00:00"
    }
    )

def appointment_template():
    return json.dumps(
        {
        "doctor": {
            "fullname" : "Appointment Template",
            "document" : {
                    "document_type" : "DNI",
                    "number" : 42575871
            },
            "address" : "Madame Curie 1070",
            "phonenumber" : 12345,
            "email" : "appointment@template.com",
            "birthdate" : "2020-05-17 00:00:00",
            "registration_date" : "2022-01-16 02:43:00",
            "time_interval_off" : {
                    "from_date" : "2022-01-16 02:43:00",
                    "to_date" : "2022-01-16 03:13:00"
            }
        },
        "patient": {
            "fullname" : "Appointment Template",
            "document" : {
                    "document_type" : "DNI",
                    "number" : 42575871
            },
            "address" : "Madame Curie 1070",
            "phonenumber" : 12345,
            "email" : "appointment@template.com",
            "birthdate" : "2020-05-17 00:00:00"
        },
        "time_range" : {
            "from_date" : "2022-01-16 02:43:00",
            "to_date" : "2022-01-16 03:13:00"
        },
        "time_interval" : {
                    "from_date" : "2022-01-16 02:43:00",
                    "to_date" : "2022-01-16 03:13:00"
            }
    }
    )

execute()
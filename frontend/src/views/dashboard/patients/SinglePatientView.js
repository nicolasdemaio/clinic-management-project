import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useParams } from 'react-router-dom';
import patientsApi from '../../../api/patientsApi';
import PersonIcon from '@mui/icons-material/Person';
import { TextField } from '@mui/material';

const SinglePatientView = () => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState(undefined);

  useEffect(() => {
    patientsApi
      .getPatientById(patientId)
      .then((response) => {
        setPatient(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Header
        title="Paciente"
        description="Persona registrada en la clínica"
        icon={<PersonIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content">
          <h3>Información personal</h3>
          <TextField
            id="outlined-read-only-input"
            value={patient && patient.fullname}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.phonenumber}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.address}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.email}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.birthdate}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.document.document_type}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            id="outlined-read-only-input"
            value={patient && patient.document.number}
            defaultValue={'Loading ...'}
            disabled
            InputProps={{
              readOnly: true,
            }}
          />

          <h3>Turnos vigentes</h3>

          <h3>Turnos asistidos</h3>
        </div>
      </div>
    </>
  );
};

export default SinglePatientView;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/basics/Header';
import { useParams } from 'react-router-dom';
import patientsApi from '../../../api/patientsApi';
import PersonIcon from '@mui/icons-material/Person';
import { Stack, TextField } from '@mui/material';
import OutlinedButton from '../../../components/buttons/OutlinedButton';

const styledBorder = {
  '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: 'var(--primary-color)',
    },
  '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary-color)',
  },
};

const SinglePatientView = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
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
          <div className="panel-grid">
            <div className="left-pane">
              <Stack component="form" noValidate sx={styledBorder}>
                <TextField
                  label="Nombre y apellido"
                  variant="outlined"
                  value={patient && patient.fullname}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
                <TextField
                  label="Domicilio"
                  variant="outlined"
                  value={patient && patient.address}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
                <TextField
                  label="Tipo documento"
                  variant="outlined"
                  value={patient && patient.document.document_type}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
                <TextField
                  label="Nacimiento"
                  variant="outlined"
                  value={patient && patient.birthdate}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
              </Stack>
            </div>
            <div className="right-pane">
              <Stack component="form" noValidate sx={styledBorder}>
                <TextField
                  label="Correo electrónico"
                  type="email"
                  variant="outlined"
                  value={patient && patient.email}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
                <TextField
                  label="Número telefónico"
                  variant="outlined"
                  value={patient && patient.phonenumber}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
                <TextField
                  label="Número de documento"
                  variant="outlined"
                  value={patient && patient.document.number}
                  defaultValue="Loading ..."
                  InputProps={{
                    readOnly: true,
                    shrink: true,
                  }}
                />
              </Stack>
            </div>
          </div>
          <h3>Turnos vigentes: </h3>
          To do
          <br />
          <h3>Turnos asistidos: </h3>
          To do
          <br /> <br />
          <OutlinedButton
            onClick={(e) => {
              navigate(-1);
            }}
          >
            Volver
          </OutlinedButton>
        </div>
      </div>
    </>
  );
};

export default SinglePatientView;

import PersonIcon from '@mui/icons-material/Person';
import Header from '../../../components/basics/Header';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './PatientCreationView.css';
import SolidButton from '../../../components/buttons/SolidButton';
import OutlinedButton from '../../../components/buttons/OutlinedButton';

const PatientCreationView = () => {
  const [value, setValue] = React.useState(new Date());
  const [age, setAge] = React.useState('');
  const possibleIdentificationTypes = [
    { label: 'D.N.I.' },
    { label: 'LU' },
    { label: 'NASHE' },
  ];
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Header
        title="Registrar paciente"
        description="Registro de nuevos pacientes en la clínica"
        icon={<PersonIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content" id="patient-creation-content">
          <div className="left-pane">
            <TextField label="Nombre y apellido" variant="outlined" />
            <TextField
              label="Correo electrónico"
              variant="outlined"
              type="email"
            />
            <TextField label="Domicilio" variant="outlined" />
            <TextField label="Número telefónico" variant="outlined" />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={possibleIdentificationTypes}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Tipo" />}
            />
            <TextField label="Número de documento" variant="outlined" />
            <TextField variant="outlined" type="date" />
          </div>
          <div className="right-pane">
            <SolidButton>Registrar</SolidButton>
            <OutlinedButton>Cancelar</OutlinedButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCreationView;

import appointmentsApi from '../../../api/appointmentsApi';
import Header from '../../../components/Header';
import StorageIcon from '@mui/icons-material/Storage';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select from '@mui/material/Select';

const DashboardScreen = () => {
  const [temporalData, setTemporalData] = useState([]);

  const searchByDocument = (event) => {
    appointmentsApi
      .getAppointments()
      .then((response) => {
        console.log(response);
        console.log(event.target.value);
        setTemporalData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="screen-container">
      <Header
        title="Dashboard"
        description="Gestión de turnos, pacientes y más"
        icon={<StorageIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content">
          <h1>Dashboard</h1>
          <h2>Buscar paciente</h2>
          <FormControl margin="normal" style={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">
              Tipo documento
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo documento"
            >
              <MenuItem value="dni">D.N.I.</MenuItem>
              <MenuItem value="li">L.I.</MenuItem>
              <MenuItem value="th">Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Identificación"
            variant="outlined"
            style={{ margin: '15px' }}
            onChange={(e) => {
              searchByDocument(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;

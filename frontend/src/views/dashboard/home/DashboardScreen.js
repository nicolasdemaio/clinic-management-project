import appointmentsApi from '../../../api/appointmentsApi';
import ProductTable from '../../../components/table/ProductTable';
import Header from '../../../components/basics/Header';
import StorageIcon from '@mui/icons-material/Storage';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select from '@mui/material/Select';

const DashboardScreen = () => {
  const [temporalData, setTemporalData] = useState([]);
  const [typeDocumentSelected, setTypeDocumentSelected] = useState('');

  const searchByDocument = (event) => {
    if (event.target.value.length >= 6) {
      appointmentsApi
        .getAppointments()
        .then((response) => {
          formatResponse(response, event);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const formatResponse = (list_of_appoints, event) => {
    for (let i = 0; list_of_appoints.length > i; i++) {
      const doctor = list_of_appoints[i].doctor.fullname;
      const patient = list_of_appoints[i].patient.fullname;
      const typeDocument = list_of_appoints[i].patient.document.document_type;
      const document = list_of_appoints[i].patient.document.number;

      if (
        document.toString() === event.target.value &&
        typeDocument === typeDocumentSelected
      ) {
        list_of_appoints = [
          {
            Doctor: doctor,
            Paciente: patient,
            Documento: document,
          },
        ];
        setTemporalData(list_of_appoints);
        break;
      }
    }
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
              onChange={(e) => {
                setTypeDocumentSelected(e.target.value);
              }}
            >
              <MenuItem value="DNI">D.N.I.</MenuItem>
              <MenuItem value="LI">L.I.</MenuItem>
              <MenuItem value="TH">Thirty</MenuItem>
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
          <ProductTable data={temporalData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;

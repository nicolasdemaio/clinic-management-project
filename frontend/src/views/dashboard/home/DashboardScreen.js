import appointmentsApi from '../../../api/appointmentsApi';
import ProductTable from '../../../components/table/ProductTable';
import Header from '../../../components/basics/Header';
import StorageIcon from '@mui/icons-material/Storage';
import { Autocomplete, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select from '@mui/material/Select';

const styledBorder = {
  '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: 'var(--primary-color)',
    },
  '.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary-color)',
  },
  width: '25%',
  margin: '10px',
  display: 'inline-block',
};

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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={styledBorder}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            options={[{ label: 'DNI' }, { label: 'LI' }, { label: 'TH' }]}
            renderInput={(params) => <TextField {...params} label="Tipo" />}
            onChange={(e) => {
              setTypeDocumentSelected(e.target.innerText);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Identificación"
            variant="outlined"
            sx={styledBorder}
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

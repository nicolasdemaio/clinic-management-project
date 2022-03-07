import StorageIcon from '@mui/icons-material/Storage';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select from '@mui/material/Select';

const DashboardView = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='screen-container'>
      <div className='screen-header'>
        <div className='screen-header-icon-container'>
          <StorageIcon fontSize='large' style={{ color: '#3E43AB' }} />
        </div>
        <div className='screen-header-descriptions'>
          <p className='screen-header-title'>Dashboard</p>
          <p className='screen-header-subtitle'>
            Gestión de turnos, pacientes y más
          </p>
        </div>
      </div>

      <div className='screen-content-container'>
        <div className='screen-content'>
          <h1>Dashboard</h1>
          <h2>Buscar paciente</h2>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Tipo documento
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Tipo'
              onChange={handleChange}
            >
              <MenuItem value={10}>D.N.I.</MenuItem>
              <MenuItem value={20}>L.I.</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='outlined-basic'
            label='Identificación'
            variant='outlined'
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

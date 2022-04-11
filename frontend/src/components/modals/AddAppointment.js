import * as React from 'react';
import Header from '../basics/Header';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '80%',
  p: '30px',
  overflow: 'hidden',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'var(--primary-background)',
  border: '0px',
  borderRadius: '15px',
  boxShadow: '10px 10px 60px rgb(0 0 0 / 40%)',
};

export const AddAppointment = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className="add-appointment-container" sx={style}>
        <Header
          title="Turnos"
          description="Citas médicas agendadas"
          style={{ margin: '-30px -30px 0px -30px' }}
        />
        <br />
        <div className="screen-content">
          <h3>Registrar una cita</h3>
          <FormControl margin="normal" style={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">
              Tipo documento
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo documento"
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
          />
        </div>
      </Box>
    </Modal>
  );
};

export default AddAppointment;

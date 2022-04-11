import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export const AddAppointment = (props) => {
  return (
    <>
      <h3>Registrar una cita</h3>
      <FormControl margin="normal" style={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-label">Tipo documento</InputLabel>
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
    </>
  );
};

export default AddAppointment;

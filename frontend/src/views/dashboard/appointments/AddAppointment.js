import { Autocomplete, Stack, TextField } from '@mui/material';
import SolidButton from '../../../components/buttons/SolidButton';
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

export const AddAppointment = (props) => {
  return (
    <>
      <h3>Registrar una cita</h3>
      <div className="panel-grid">
        <div className="left-pane">
          <Stack component="form" noValidate sx={styledBorder}>
            <TextField label="Nombre y apellido" variant="outlined" />
            <TextField label="Domicilio" variant="outlined" />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[
                { label: 'D.N.I.' },
                { label: 'LU' },
                { label: 'NASHE' },
              ]}
              renderInput={(params) => <TextField {...params} label="Tipo" />}
            />
            <TextField
              id="date"
              label="Nacimiento"
              type="date"
              InputLabelProps={{
                shrink: 'true',
              }}
            />
            <br />
            <TextField
              id="datetime-local"
              label="Appointment"
              type="datetime-local"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: 'true',
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
            />
            <TextField label="Número telefónico" variant="outlined" />
            <TextField label="Número de documento" variant="outlined" />
          </Stack>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <SolidButton
          onClick={(e) => {
            alert('api register');
          }}
        >
          Registrar
        </SolidButton>
        <OutlinedButton onClick={props.onClose}>Cancelar</OutlinedButton>
      </div>
    </>
  );
};

export default AddAppointment;

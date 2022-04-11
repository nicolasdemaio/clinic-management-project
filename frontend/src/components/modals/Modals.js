import * as React from 'react';
import Header from '../basics/Header';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

export const Modals = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className="add-appointment-container" sx={style}>
        <Header
          title={props.title}
          description={props.description}
          icon={props.icon}
          style={{ margin: '-30px -30px 0px -30px' }}
        />
        <br />
        <div className="screen-content">{props.children}</div>
      </Box>
    </Modal>
  );
};

export default Modals;

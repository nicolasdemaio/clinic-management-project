import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

export default function TableActionButton() {
  const [anchorEl, setAnchorEl] = React.useState(undefined);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <div>
      <Button
        id="basic-button"
        sx={{ color: 'var(--primary-color)' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <EditIcon fontSize="small" /> Modificar
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <ClearIcon fontSize="small" /> Eliminar
        </MenuItem>
      </Menu>
    </div>
  );
}

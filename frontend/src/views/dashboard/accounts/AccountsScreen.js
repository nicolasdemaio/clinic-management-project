import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import usersApi from '../../../api/usersApi';
import '../appointments/AppointmentsScreen.css';
import BackdropLoading from '../../../components/BackdropLoading';
import PersonIcon from '@mui/icons-material/Person';
import { FaSearch } from 'react-icons/fa';
import ProductTable from '../../../components/table/ProductTable';
import SearchTable from '../../../components/table/SearchTable';
import AddIcon from '@mui/icons-material/Add';
import OutlinedButton from '../../../components/buttons/OutlinedButton';
import Modals from '../../../components/modals/Modals';
import AddAccount from './AddAccount';

const AccountsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const [temporalData, setTemporalData] = useState([]);

  useEffect(() => {
    usersApi
      .getUserById()
      .then((response) => {
        formatResponse(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formatResponse = (list_of_users) => {
    for (let i = 0; list_of_users.length > i; i++) {
      const id = list_of_users[i].id;
      const username = list_of_users[i].username;
      const dni = list_of_users[i].dni;
      const roles = list_of_users[i].roles;

      list_of_users[i] = {
        index: id,
        Usuario: username,
        Documento: dni,
        Roles: roles,
      };
    }
    setTemporalData(list_of_users);
  };

  return (
    <>
      {showBackdrop ? <BackdropLoading /> : undefined}

      <Header
        title="Usuarios"
        description="Usuarios registrados en la base de datos"
        icon={<PersonIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content">
          <div className="appointments-out-table">
            <div className="div-search">
              <input
                type="text"
                onChange={(e) => {
                  SearchTable(e.target.value, 'producttable');
                }}
                placeholder="Nombre del usuario..."
              />
              <i className="icon">
                <FaSearch />
              </i>
            </div>
            <OutlinedButton
              onClick={(e) => {
                setOpen(true);
              }}
            >
              <AddIcon /> Agregar un usuario
            </OutlinedButton>
            <Modals
              open={open}
              onClose={(e) => setOpen(false)}
              title="Usuarios"
              description="Base de datos"
              icon={<PersonIcon />}
            >
              <AddAccount onClose={(e) => setOpen(false)} />
            </Modals>
          </div>
          <ProductTable
            data={temporalData}
            searchParameter="Usuario"
            actions
            />
        </div>
      </div>
    </>
  );
};

export default AccountsScreen;

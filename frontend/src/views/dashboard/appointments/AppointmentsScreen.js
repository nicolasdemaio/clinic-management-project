import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { FaSearch } from 'react-icons/fa';
import Button from '@mui/material/Button';
import appointmentsApi from '../../../api/appointmentsApi';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';
import BackdropLoading from '../../../components/BackdropLoading';
import ProductTable from '../../../components/ProductTable';
import './AppointmentsScreen.css';

const AppointmentsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const [temporalData, setTemporalData] = useState([]);

  useEffect(() => {
    appointmentsApi
      .getAppointments()
      .then((response) => {
        console.log(response);
        setTemporalData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //------------- BUSCADOR DE LA TABLA --------------------------------
  const searchTable = (event, table) => {
    let detecta = document.getElementsByName(table);
    let state;

    if (event.target.value) {
      state = 'none';
    } else {
      state = '';
    }
    for (let entry of detecta) {
      entry.style.display = state;

      if (
        state === 'none' &&
        entry.outerHTML.indexOf(event.target.value.toLowerCase()) > -1
      ) {
        entry.style.display = '';
      }
    }
  };

  return (
    <div className="screen-container">
      {showBackdrop ? <BackdropLoading /> : undefined}

      <Header
        title="Turnos"
        description="Citas médicas agendadas"
        icon={<EventNoteIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content">
          <div className="appointments-out-table">
            <div className="div-search">
              <input
                type="text"
                onChange={(e) => searchTable(e, 'producttable')}
                placeholder="Nombre del paciente..."
              />
              <i className="icon">
                <FaSearch />
              </i>
            </div>
            <Button
              variant="outlined"
              style={{
                color: 'var(--primary-color)',
                borderColor: 'var(--primary-color)',
              }}
            >
              <AddIcon /> Agendar una cita
            </Button>
          </div>
          <ProductTable data={temporalData} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsScreen;

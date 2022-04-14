import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import { FaSearch } from 'react-icons/fa';
import appointmentsApi from '../../../api/appointmentsApi';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';
import BackdropLoading from '../../../components/BackdropLoading';
import ProductTable from '../../../components/table/ProductTable';
import SearchTable from '../../../components/table/SearchTable';
import FormatDate from '../../../context/FormatDate';
import OutlinedButton from '../../../components/buttons/OutlinedButton';
import './AppointmentsScreen.css';
import Modals from '../../../components/modals/Modals';
import AddAppointment from './AddAppointment';
import PersonIcon from '@mui/icons-material/Person';

const AppointmentsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [temporalData, setTemporalData] = useState([]);

  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  useEffect(() => {
    appointmentsApi
      .getAppointments()
      .then((response) => {
        formatResponse(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formatResponse = (list_of_appoints) => {
    for (let i = 0; list_of_appoints.length > i; i++) {
      const doctor = list_of_appoints[i].doctor.fullname;
      const patient = list_of_appoints[i].patient.fullname;
      const time_interval = FormatDate(list_of_appoints[i].time_interval);

      list_of_appoints[i] = {
        Doctor: doctor,
        Paciente: patient,
        Horario: time_interval,
      };
    }

    setTemporalData(list_of_appoints);
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
                onChange={(e) => {
                  SearchTable(e.target.value, 'producttable');
                }}
                placeholder="Nombre del paciente..."
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
              <AddIcon /> Agendar una cita
            </OutlinedButton>
            <Modals
              open={open}
              onClose={(e) => setOpen(false)}
              title="Turnos"
              description="Citas médicas agendadas"
              icon={<PersonIcon />}
            >
              <AddAppointment onClose={(e) => setOpen(false)} />
            </Modals>
          </div>
          <ProductTable
            data={temporalData}
            searchParameter="Paciente"
            actions
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsScreen;

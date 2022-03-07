import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Button from '@mui/material/Button';
import appointmentsApi from '../../../api/appointmentsApi';
import EventNoteIcon from '@mui/icons-material/EventNote';
import '../appointments/AppointmentsScreen.css';
import AddIcon from '@mui/icons-material/Add';
import BackdropLoading from '../../../components/BackdropLoading';
import TableActionButton from '../../../components/buttons/TableActionButton';
import PersonIcon from '@mui/icons-material/Person';
import patientsApi from '../../../api/patientsApi';

const PatientsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const navigate = useNavigate();

  const [temporalData, setTemporalData] = useState([]);

  const formattedTimeWithoutSeconds = (aTime) => {
    return aTime.substring(0, 5);
  };

  const formattedDate = (aDate) => {
    return new Date(aDate).toLocaleDateString('es-es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  return (
    <>
      {showBackdrop ? <BackdropLoading /> : undefined}

      <div className='screen-header'>
        <div className='screen-header-icon-container'>
          <PersonIcon fontSize='large' style={{ color: '#3E43AB' }} />
        </div>
        <div className='screen-header-descriptions'>
          <p className='screen-header-title'>Pacientes</p>
          <p className='screen-header-subtitle'>
            Personas registrados en la clínica
          </p>
        </div>
      </div>

      <div className='screen-content-container'>
        <div className='screen-content'>
          <button onClick={() => navigate('create')}>Registrar paciente</button>

          <div className='temporalData'>
            <table>
              <tr>
                <th>Index</th>
                <th>Doctor</th>
                <th>Patient</th>
              </tr>
              {temporalData &&
                temporalData.map((book, index) => {
                  return (
                    <tr key={index}>
                      <td>Book {index + 1}</td>
                      <td>Patient ID: {book.patient.id}</td>
                      <td>{book.doctor.fullname}</td>
                      <td>{book.patient.fullname}</td>
                      <button onClick={() => navigate(`${book.patient.id}`)}>
                        Get patient on console
                      </button>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsScreen;

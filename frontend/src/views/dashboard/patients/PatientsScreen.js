import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import { useNavigate } from 'react-router-dom';
import appointmentsApi from '../../../api/appointmentsApi';
import '../appointments/AppointmentsScreen.css';
import BackdropLoading from '../../../components/BackdropLoading';
import PersonIcon from '@mui/icons-material/Person';

const PatientsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const navigate = useNavigate();

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

  return (
    <>
      {showBackdrop ? <BackdropLoading /> : undefined}

      <Header
        title="Pacientes"
        description="Personas registrados en la clínica"
        icon={<PersonIcon />}
      />

      <div className="screen-content-container">
        <div className="screen-content">
          <button onClick={() => navigate('create')}>Registrar paciente</button>

          <div className="temporalData">
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

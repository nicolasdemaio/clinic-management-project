import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import { useNavigate } from 'react-router-dom';
import appointmentsApi from '../../../api/appointmentsApi';
import '../appointments/AppointmentsScreen.css';
import BackdropLoading from '../../../components/BackdropLoading';
import PersonIcon from '@mui/icons-material/Person';
import OutlinedButton from '../../../components/buttons/OutlinedButton';
import AddIcon from '@mui/icons-material/Add';
import SolidButton from '../../../components/buttons/SolidButton';
import ProductTable from '../../../components/table/ProductTable';
import Modals from '../../../components/modals/Modals';
import AddPatient from './AddPatient';

const PatientsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  const [open, setOpen] = useState(false);

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
        formatResponse(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formatResponse = (list_of_appoints) => {
    for (let i = 0; list_of_appoints.length > i; i++) {
      const index = list_of_appoints[i].patient.id;
      const doctor = list_of_appoints[i].doctor.fullname;
      const patient = list_of_appoints[i].patient.fullname;

      list_of_appoints[i] = {
        Index: index,
        Doctor: doctor,
        Patient: patient,
      };
    }

    setTemporalData(list_of_appoints);
  };

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
          {/* <OutlinedButton onClick={(e) => navigate('create')}>
            <AddIcon /> Registrar paciente
          </OutlinedButton> */}

          <OutlinedButton
            onClick={(e) => {
              setOpen(true);
            }}
          >
            <AddIcon /> Registrar paciente
          </OutlinedButton>
          <Modals
            open={open}
            onClose={(e) => setOpen(false)}
            title="Registro"
            description="Registrar paciente"
            icon={<PersonIcon />}
          >
            <AddPatient onClose={(e) => setOpen(false)} />
          </Modals>

          <ProductTable
            data={temporalData}
            searchParameter="Paciente"
            actions="custom"
          >
            <SolidButton
              onClick={(e) =>
                navigate(
                  e.nativeEvent.path[2].innerText.split(' ')[0].split('\t')[0]
                )
              }
            >
              Get patient on console
            </SolidButton>
          </ProductTable>

          {/* <div className="temporalData">
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
                      <SolidButton
                        onClick={() => navigate(`${book.patient.id}`)}
                      >
                        Get patient on console
                      </SolidButton>
                      <br />
                    </tr>
                  );
                })}
            </table>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PatientsScreen;

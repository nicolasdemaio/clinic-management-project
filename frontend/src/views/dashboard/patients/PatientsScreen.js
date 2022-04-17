import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import { useNavigate } from 'react-router-dom';
import patientsApi from '../../../api/patientsApi';
import '../appointments/AppointmentsScreen.css';
import BackdropLoading from '../../../components/BackdropLoading';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { FaSearch } from 'react-icons/fa';
import OutlinedButton from '../../../components/buttons/OutlinedButton';
import SolidButton from '../../../components/buttons/SolidButton';
import ProductTable from '../../../components/table/ProductTable';
import Modals from '../../../components/modals/Modals';
import AddPatient from './AddPatient';
import SearchTable from '../../../components/table/SearchTable';

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
    patientsApi
      .getPatientById()
      .then((response) => {
        formatResponse(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formatResponse = (list_of_appoints) => {
    for (let i = 0; list_of_appoints.length > i; i++) {
      const id = list_of_appoints[i].id;
      const patient = list_of_appoints[i].fullname;
      const dni = list_of_appoints[i].document.number;

      list_of_appoints[i] = {
        index: id,
        Paciente: patient,
        Documento: dni
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
          </div>
          <ProductTable
            data={temporalData}
            searchParameter="Paciente"
            actions="custom"
          >
            <SolidButton
              onClick={(e) =>
                navigate(e.nativeEvent.path[2].attributes.index.value)
              }
            >
              Get patient on console
            </SolidButton>
          </ProductTable>
        </div>
      </div>
    </>
  );
};

export default PatientsScreen;

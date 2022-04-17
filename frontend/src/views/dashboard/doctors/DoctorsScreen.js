import React, { useState, useEffect } from 'react';
import Header from '../../../components/basics/Header';
import { useNavigate } from 'react-router-dom';
import doctorsApi from '../../../api/doctorsApi';
import '../appointments/AppointmentsScreen.css';
import BackdropLoading from '../../../components/BackdropLoading';
import PersonIcon from '@mui/icons-material/Person';
import { FaSearch } from 'react-icons/fa';
import SolidButton from '../../../components/buttons/SolidButton';
import ProductTable from '../../../components/table/ProductTable';
import SearchTable from '../../../components/table/SearchTable';
import FormatDate from '../../../context/FormatDate';

const DoctorsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const navigate = useNavigate();

  const [temporalData, setTemporalData] = useState([]);

  useEffect(() => {
    doctorsApi
      .getDoctorById()
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
      const doctor = list_of_appoints[i].fullname;
      const time_interval = FormatDate(list_of_appoints[i].time_interval_off);

      list_of_appoints[i] = {
        index: id,
        Doctor: doctor,
        Actividad: time_interval,
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
          </div>
          <ProductTable
            data={temporalData}
            searchParameter="Doctor"
            actions="custom"
          >
            <SolidButton
              onClick={(e) =>
                navigate(e.nativeEvent.path[1].attributes.index.value)
              }
            >
              Más Información
            </SolidButton>
          </ProductTable>
        </div>
      </div>
    </>
  );
};

export default DoctorsScreen;

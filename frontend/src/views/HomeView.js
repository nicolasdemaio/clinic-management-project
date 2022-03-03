import './HomeView.css'
import './HomeThead.css'
import {DateField,DocumentField, ShortTextField, LongTextField, FullnameTextField, EmailTextField} from '../components/fields'
import AcceptButton from '../components/buttons/AcceptButton'
import DenyButton from '../components/buttons/DenyButton'
import PrivateButton from '../components/buttons/PrivateButton'
import Logo from '../images/logo.png'
import { Fragment, useState, useMemo } from 'react'
import { FaAngleRight, FaUserAlt, FaRegCalendarAlt, FaHospitalUser, FaBriefcaseMedical, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const APPOINTMENT_URL = 'api/appointments'

const HomeView = () => {
  
  const navigate = useNavigate()
  let userLogged = localStorage.getItem("roles");

  if (typeof(userLogged) != 'object'){
      userLogged = [userLogged]
  }

  const [selectedOption, setSelectedOption] = useState('default');
  const [temporalData, setTemporalData] = useState([{}]);

  const backToStart = (event) => {
    event.preventDefault();
    navigate('/')
  }

  const changeOptions = (event, target) => {
    event.preventDefault();

    if (target === 'appointments'){
      setSelectedOption('appointments');
      handleGetAppointments();
    } else if (target === 'doctors'){
      setSelectedOption('doctors');
    } else if (target === 'patients'){
      setSelectedOption('patients');
    } else if (target === 'accounts'){
      setSelectedOption('accounts');
    }
  }
  
  async function handleGetAppointments(){
    await axios.get(APPOINTMENT_URL)
    .then(response => {
      console.log('-- Data Response --');
      console.log(response.data);
      setTemporalData(response.data.data);
    })
    .catch(e => {
        console.log(e)
    })
  }

  const searchTable = (event, table) => {
    var detecta= document.getElementsByName(table)
    let state

    if (event.target.value){
      state = 'none';
    } else {
      state = '';
    }
    for (let entry of detecta) {
      entry.style.display = state;

      if ((state === 'none') && (entry.outerHTML.indexOf(event.target.value.toLowerCase()) > -1)){
        entry.style.display = '';
      }
    }
  }

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
  
    const sortedItems = useMemo(() => {
      let sortableItems = items;
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };

  const ProductTable = (props) => {
    const list_of_appoints = props.appoint

    // [{ id: 1, time_interval: '8 a 9', doctor: 'Jordoctor', patient: 'Ponpaciente' }]
    if ((list_of_appoints.length > 0) && (Object.keys(list_of_appoints[0]).length !== 0)){
      if (list_of_appoints[0].patient.fullname){
        for (var i = 0; list_of_appoints.length > i; i++) {
          const id = i
          const uid = list_of_appoints[i].id
          const doctor = list_of_appoints[i].doctor.fullname
          const patient = list_of_appoints[i].patient.fullname
          const time_interval = list_of_appoints[i].time_interval.from_date.split(' ')[0]
          const date_interval = list_of_appoints[i].time_interval.from_date.split(' ')[0]
          const from_interval = list_of_appoints[i].time_interval.from_date.split(' ')[1]
          const to_interval = list_of_appoints[i].time_interval.to_date.split(' ')[1]

          props.appoint[i] = {id: id, uid: uid, doctor: doctor, patient: patient, from_interval:from_interval, to_interval:to_interval, date_interval:date_interval, time_interval: time_interval}
        } 
      }
    }
    
    const { items, requestSort, sortConfig } = useSortableData(list_of_appoints);
    const getClassNamesFor = (time_interval) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === time_interval ? sortConfig.direction : undefined;
    };
    return (
      <table id="table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('patient')}
                className={getClassNamesFor('patient')}
              >
                Patient
              </button>
            </th>            
            <th>
              <button
                type="button"
                onClick={() => requestSort('doctor')}
                className={getClassNamesFor('doctor')}
              >
                Doctor
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('time_interval')}
                className={getClassNamesFor('time_interval')}
              >
                Time Interval
              </button>
            </th>
            <th>
              <button> Actions </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} id={item.patient === undefined ? undefined : item.patient.toLowerCase()} name='appointlist'>
              <td>{item.patient}</td>
              <td>{item.doctor}</td>
              <td>{item.date_interval}<br/>From: {item.from_interval}<br/>To: {item.to_interval}</td>
              <td>
                <AcceptButton id={item.uid} />
                <DenyButton id={item.uid}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Fragment>
      <div className='home-container'>
      <div className="vertical-menu">
        <div className="vertical-menu-logo">
          <img id="logo-admin" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} alt='logo' src={Logo}/>
        </div>
        <ul className="vertical-menu-links">
          <li onClick={(e) => changeOptions(e, 'appointments')}><a href="#appointments"> <FaRegCalendarAlt /> <label>Appointments</label> </a></li>
          <li onClick={(e) => changeOptions(e, 'doctors')}><a href="#doctors"> <FaHospitalUser />&nbsp;<label>Doctors</label> </a></li>
          <li onClick={(e) => changeOptions(e, 'patients')}><a href="#patients"><FaBriefcaseMedical />&nbsp;<label>Patients</label> </a></li>
          {userLogged.includes('ADMIN')? <li onClick={(e) => changeOptions(e, 'accounts')}><a href="#accounts"><FaUserAlt />&nbsp;<label>Accounts</label> </a></li> : null}
        </ul>
      </div>

      <div className="content-container">
        <h1>Se vienen cositas</h1>
        <p>dea</p>
        {
        (selectedOption === 'appointments')? <><PrivateButton /> <div className='div-search'> <input type="text" onChange={(e) => searchTable(e, 'appointlist')} placeholder="Nombre del paciente..."/><i class="icon"><FaSearch /></i> </div> <ProductTable appoint={temporalData}/> </>
        : (selectedOption === 'doctors')? 'doctors'
        : (selectedOption === 'patients')? 'patients'
        : (selectedOption === 'accounts')? 'accounts'
        : ("Elegi una opcion del costado careta",
            userLogged.includes('ADMIN')
            ? "EL USER ES ADMIN"
            : "EL USER NO ES ADMIN" )
        }
        {/* ----------------------------------------------- */}


        {/* ----------------------------------------------- */}

      </div>
      <a onClick={backToStart} href="/" className="float">
        <FaAngleRight className="my-float" />
      </a>
    </div>
      <div className='left-pane'>
        <p className='view-subtitle'>Clinic Management</p>
        <div className='view-tabs-container'>
          <p className='view-tab'>Appointments</p>
          <p className='view-tab'>Doctors</p>
          <p className='view-tab'>Patients</p>
        </div>
      
      </div>
      <div className='right-pane'>
        <div className='view-header'>
          <p className='view-subtitle'>Formulario para registrar paciente</p>
        </div>
        <div className='view-content'>
          <p className='view-title'>Nuevo paciente</p>  

          <form>
            <FullnameTextField />
            <LongTextField text='Domicilio'/>
            <EmailTextField text='Correo electrónico'/>
            <ShortTextField text='Teléfono'/>
            <DateField text='Fecha de nacimiento'/>
            <DocumentField text='Documento'/>
          </form>

          <AcceptButton />
          <DenyButton />
        </div>
      </div>
    </Fragment>
  )
}

export default HomeView
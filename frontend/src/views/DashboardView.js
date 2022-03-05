import './DashboardView.css'
import './DashboardThead.css'
import {DateField,DocumentField, ShortTextField, LongTextField, FullnameTextField, EmailTextField} from '../components/fields'
import DeleteButton from '../components/buttons/DeleteButton'
import ModifyButton from '../components/buttons/ModifyButton'
import AddButton from '../components/buttons/AddButton'
import Logo from '../images/logo.png'
import { Fragment, useState, useMemo } from 'react'
import { FaAngleRight, FaUserAlt, FaRegCalendarAlt, FaHospitalUser, FaBriefcaseMedical, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import AppointmentsScreen from '../screens/AppointmentsScreen'

const DashboardView = () => {
  
  const navigate = useNavigate()
  let userLogged = localStorage.getItem("roles");

  if (typeof(userLogged) != 'object'){
      userLogged = [userLogged]
  }

  const [selectedOption, setSelectedOption] = useState('default');

  const backToStart = (event) => {
    event.preventDefault();
    navigate('/')
  }

  const changeOptions = (event, target) => {
    event.preventDefault();

    if (target === 'appointments'){
      setSelectedOption('appointments');
    } else if (target === 'doctors'){
      setSelectedOption('doctors');
    } else if (target === 'patients'){
      setSelectedOption('patients');
    } else if (target === 'accounts'){
      setSelectedOption('accounts');
    }
  }
  

  return (
    <Fragment>
      <div className='dashboard-container'>
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

        {/* -------------HAY Q MEJORAR COMO SE MUESTRA SEGUN LO ELEGIDO DEL NAVBAR------------------- */}
        {
        (selectedOption === 'appointments')? 
              <>
                <AppointmentsScreen />
              </>
        : (selectedOption === 'doctors')?
              <>
                {'doctors'}
              </>
        : (selectedOption === 'patients')?
              <>
                {'patients'}
              </>
        : (selectedOption === 'accounts')?
              <>
                {'accounts'}
              </>
        : (
            "Elegi una opcion del costado careta",
            userLogged.includes('ADMIN')? "EL USER ES ADMIN" : "EL USER NO ES ADMIN"
          )
        }
        {/* ----------------------Patio de juegos------------------------- */}


        {/* -------------------Patio de juegos---------------------------- */}

      </div>
      <a onClick={backToStart} href="/" className="float">
        <FaAngleRight className="my-float" />
      </a>
    </div>
      {/* <div className='left-pane'>
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

          <DeleteButton />
          <ModifyButton />
        </div>
      </div> */}
    </Fragment>
  )
}

export default DashboardView
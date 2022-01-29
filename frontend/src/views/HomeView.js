import './HomeView.css'
import React from 'react'
import {DateField,DocumentField, ShortTextField, LongTextField, FullnameTextField, EmailTextField} from '../components/fields'
import AcceptButton from '../components/buttons/AcceptButton'
import DenyButton from '../components/buttons/DenyButton'

const HomeView = () => {

  return (
    <div className='home-container'>
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
    </div>
  )
}

export default HomeView
import './UnauthorizedView.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const UnauthorizedView = () => {

  const navigate = useNavigate()
  const handleGoBack = () => navigate(-1)

  return (
    <div className='unauthorized-container'>
      <h1 className='unauthorized-title'>Clinic Management System</h1>

      <div className='unauthorized-input-container'>
        <label className='unauthorized-label'>No tiene acceso a este sitio.</label>
      </div>
      
      <button className='unauthorized-button' onClick={handleGoBack}>Volver</button>
    </div>
  )
}

export default UnauthorizedView
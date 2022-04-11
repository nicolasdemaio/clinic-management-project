import './UnauthorizedView.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SolidButton from '../components/buttons/SolidButton';

const UnauthorizedView = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-title">Clinic Management System</h1>

      <div className="unauthorized-input-container">
        <label className="unauthorized-label">
          No tiene acceso a este sitio.
        </label>
      </div>
      <br />
      <SolidButton onClick={handleGoBack}>Volver</SolidButton>
    </div>
  );
};

export default UnauthorizedView;

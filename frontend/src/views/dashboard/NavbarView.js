import './NavbarView.css';
import Logo from '../../images/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaHospitalUser,
  FaBriefcaseMedical,
} from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarView = () => {
  const navigate = useNavigate();

  const changeActiveButton = (event, a_direction) => {
    document
      .getElementsByClassName('active-dashbutton')[0]
      .classList.remove('active-dashbutton');
    event.target.classList.add('active-dashbutton');
    navigate(a_direction);
  };

  const handleCloseSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  let userLogged = localStorage.getItem('roles');

  if (typeof userLogged != 'object') {
    userLogged = [userLogged];
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-vertical-bar">
          <img
            className="dashboard-vertical-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            alt="logo"
            src={Logo}
          />
          <button
            className="dashboard-vertical-button active-dashbutton"
            onClick={(e) => changeActiveButton(e, '/dashboard/home')}
          >
            <HomeIcon style={{ pointerEvents: 'none' }} /> Inicio
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(e) => changeActiveButton(e, '/dashboard/appointments')}
          >
            <FaRegCalendarAlt style={{ pointerEvents: 'none' }} /> Turnos
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(e) => changeActiveButton(e, '/dashboard/patients')}
          >
            <FaHospitalUser style={{ pointerEvents: 'none' }} /> Pacientes
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(e) => changeActiveButton(e, '/dashboard/doctors')}
          >
            <FaBriefcaseMedical style={{ pointerEvents: 'none' }} /> Doctores
          </button>
          {userLogged.includes('ADMIN') ? (
            <button
              className="dashboard-vertical-button"
              onClick={(e) => changeActiveButton(e, '/dashboard/accounts')}
            >
              <FaUserAlt style={{ pointerEvents: 'none' }} /> Cuentas
            </button>
          ) : undefined}
          <button
            className="dashboard-vertical-button"
            onClick={handleCloseSession}
          >
            <LogoutIcon /> Cerrar sesión
          </button>
        </div>

        <div className="dashboard-content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NavbarView;

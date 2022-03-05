import "./DashboardView.css";
import "./DashboardThead.css";
import Logo from "../images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaHospitalUser,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";


const DashboardView = () => {
  const navigate = useNavigate();
  let userLogged = localStorage.getItem("roles");

  if (typeof userLogged != "object") {
    userLogged = [userLogged];
  }

  return (
    <>
      <div className="dashboard-container">
    
        <div className="vertical-menu">
          <div className="vertical-menu-logo">
            <img
              id="logo-admin"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              alt="logo"
              src={Logo}
            />
          </div>
          <ul className="vertical-menu-links">
          <li onClick={(e) => navigate('/dashboard/home')}>
              <a>
                {" "}
                <HomeIcon /> <label>Inicio</label>{" "}
              </a>
            </li>
            <li onClick={(e) => navigate('/dashboard/appointments')}>
              <a>
                {" "}
                <FaRegCalendarAlt /> <label>Appointments</label>{" "}
              </a>
            </li>
            <li onClick={(e) => navigate('/dashboard/doctors')}>
              <a>
                {" "}
                <FaHospitalUser />
                &nbsp;<label>Doctores</label>{" "}
              </a>
            </li>
            <li onClick={(e) => navigate('/dashboard/patients')}>
              <a>
                <FaBriefcaseMedical />
                &nbsp;<label>Pacientes</label>{" "}
              </a>
            </li>
            {userLogged.includes("ADMIN") ? (
              <li onClick={(e) => navigate("/dashboard/accounts")}>
                <a>
                  <FaUserAlt />
                  &nbsp;<label>Cuentas</label>{" "}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardView;

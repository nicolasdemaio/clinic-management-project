import "./DashboardView.css";
import "./appointments/DashboardThead.css";
import Logo from "../../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import {
  FaUserAlt,
  FaRegCalendarAlt,
  FaHospitalUser,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardView = () => {
  const navigate = useNavigate();

  const handleCloseSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  let userLogged = localStorage.getItem("roles");

  if (typeof userLogged != "object") {
    userLogged = [userLogged];
  }

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-vertical-bar">
          <img
            className="dashboard-vertical-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            alt="logo"
            src={Logo}
          />

          <button
            className="dashboard-vertical-button"
            onClick={(event) => navigate("/dashboard/home")}
          >
            <HomeIcon />
            Inicio
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(event) => navigate("/dashboard/appointments")}
          >
            {" "}
            <FaRegCalendarAlt /> Turnos
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(event) => navigate("/dashboard/patients")}
          >
            {" "}
            <FaHospitalUser /> Pacientes
          </button>
          <button
            className="dashboard-vertical-button"
            onClick={(event) => navigate("/dashboard/doctors")}
          >
            {" "}
            <FaBriefcaseMedical /> Doctores
          </button>

          {userLogged.includes("ADMIN") ? (
            <button
              className="dashboard-vertical-button"
              onClick={(event) => navigate("/dashboard/accounts")}
            >
              <FaUserAlt />
              Cuentas
            </button>
          ) : null}
          <button
            className="dashboard-vertical-button"
            onClick={handleCloseSession}
          >
            {" "}
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

export default DashboardView;

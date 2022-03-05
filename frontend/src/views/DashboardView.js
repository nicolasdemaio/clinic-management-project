import "./DashboardView.css";
import "./DashboardThead.css";
import {
  DateField,
  DocumentField,
  ShortTextField,
  LongTextField,
  FullnameTextField,
  EmailTextField,
} from "../components/fields";
import DeleteButton from "../components/buttons/DeleteButton";
import ModifyButton from "../components/buttons/ModifyButton";
import AddButton from "../components/buttons/AddButton";
import Logo from "../images/logo.png";
import { Fragment, useState, useMemo } from "react";
import {
  FaAngleRight,
  FaUserAlt,
  FaRegCalendarAlt,
  FaHospitalUser,
  FaBriefcaseMedical,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import PatientsScreen from "../screens/PatientsScreen";

const DashboardView = () => {
  const navigate = useNavigate();
  let userLogged = localStorage.getItem("roles");

  if (typeof userLogged != "object") {
    userLogged = [userLogged];
  }

  const [selectedOption, setSelectedOption] = useState("default");

  const backToStart = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const changeOptions = (event, target) => {
    event.preventDefault();

    if (target === "appointments") {
      setSelectedOption("appointments");
    } else if (target === "doctors") {
      setSelectedOption("doctors");
    } else if (target === "patients") {
      setSelectedOption("patients");
    } else if (target === "accounts") {
      setSelectedOption("accounts");
    }
  };

  return (
    <Fragment>
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
            <li onClick={(e) => changeOptions(e, "appointments")}>
              <a href="#appointments">
                {" "}
                <FaRegCalendarAlt /> <label>Appointments</label>{" "}
              </a>
            </li>
            <li onClick={(e) => changeOptions(e, "doctors")}>
              <a href="#doctors">
                {" "}
                <FaHospitalUser />
                &nbsp;<label>Doctores</label>{" "}
              </a>
            </li>
            <li onClick={(e) => changeOptions(e, "patients")}>
              <a href="#patients">
                <FaBriefcaseMedical />
                &nbsp;<label>Pacientes</label>{" "}
              </a>
            </li>
            {userLogged.includes("ADMIN") ? (
              <li onClick={(e) => changeOptions(e, "accounts")}>
                <a href="#accounts">
                  <FaUserAlt />
                  &nbsp;<label>Cuentas</label>{" "}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="content-container">
          {/* <h1>Se vienen cositas</h1>
          <p>dea</p> */}

          {/* -------------HAY Q MEJORAR COMO SE MUESTRA SEGUN LO ELEGIDO DEL NAVBAR------------------- */}
          {selectedOption === "appointments" ? (
              <AppointmentsScreen />
          ) : selectedOption === "doctors" ? (
            <h1>doctor</h1>
          ) : selectedOption === "patients" ? (
              <PatientsScreen />
          ) : selectedOption === "accounts" ? (
            <h1>cuentas</h1>
          ) : (
            ("Elegi una opcion del costado careta",
            userLogged.includes("ADMIN")
              ? "EL USER ES ADMIN"
              : "EL USER NO ES ADMIN")
          )}
          {/* ----------------------Patio de juegos------------------------- */}

          {/* -------------------Patio de juegos---------------------------- */}
          <a onClick={backToStart} href="/" className="float">
            <FaAngleRight className="my-float" />
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardView;

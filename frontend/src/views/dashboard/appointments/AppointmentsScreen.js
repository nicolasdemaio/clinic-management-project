import React, { useState, useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
import appointmentsApi from "../../../api/appointmentsApi";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "./AppointmentsScreen.css";
import AddIcon from "@mui/icons-material/Add";
import BackdropLoading from "../../../components/BackdropLoading";
import TableActionButton from "../../../components/buttons/TableActionButton";

const AppointmentsScreen = () => {
  const [showBackdrop, setShowBackDrop] = useState(false);
  useEffect(() => {
    setShowBackDrop(true);
    setTimeout(() => setShowBackDrop(false), 1200);
  }, []);

  const [temporalData, setTemporalData] = useState([]);

  const formattedTimeWithoutSeconds = (aTime) => {
    return aTime.substring(0, 5);
  };

  const formattedDate = (aDate) => {
    return new Date(aDate).toLocaleDateString("es-es", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    appointmentsApi
      .getAppointments()
      .then((response) => {
        console.log(response);
        setTemporalData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //------------- BUSCADOR DE LA TABLA --------------------------------
  const searchTable = (event, table) => {
    var detecta = document.getElementsByName(table);
    let state;

    if (event.target.value) {
      state = "none";
    } else {
      state = "";
    }
    for (let entry of detecta) {
      entry.style.display = state;

      if (
        state === "none" &&
        entry.outerHTML.indexOf(event.target.value.toLowerCase()) > -1
      ) {
        entry.style.display = "";
      }
    }
  };

  // ------------- FILTRO DE LA TABLA --------------------------------
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
      let sortableItems = items;
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  // ------------- GENERA LA TABLA CON EL ARRAY DADO --------------------------------
  const ProductTable = (props) => {
    const list_of_appoints = props.appoint;

    // [{ id: 1, time_interval: '8 a 9', doctor: 'Jordoctor', patient: 'Ponpaciente' }]
    if (
      list_of_appoints.length > 0 &&
      Object.keys(list_of_appoints[0]).length !== 0
    ) {
      if (list_of_appoints[0].patient.fullname) {
        for (var i = 0; list_of_appoints.length > i; i++) {
          const id = i;
          const uid = list_of_appoints[i].id;
          const doctor = list_of_appoints[i].doctor.fullname;
          const patient = list_of_appoints[i].patient.fullname;
          const time_interval =
            list_of_appoints[i].time_interval.from_date.split(" ")[0];
          const date_interval =
            list_of_appoints[i].time_interval.from_date.split(" ")[0];
          const from_interval =
            list_of_appoints[i].time_interval.from_date.split(" ")[1];
          const to_interval =
            list_of_appoints[i].time_interval.to_date.split(" ")[1];

          props.appoint[i] = {
            id: id,
            uid: uid,
            doctor: doctor,
            patient: patient,
            from_interval: from_interval,
            to_interval: to_interval,
            date_interval: date_interval,
            time_interval: time_interval,
          };
        }
      }
    }

    const { items, requestSort, sortConfig } =
      useSortableData(list_of_appoints);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <table id="table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("patient")}
                className={getClassNamesFor("patient")}
              >
                Paciente
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("doctor")}
                className={getClassNamesFor("doctor")}
              >
                Doctor
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("time_interval")}
                className={getClassNamesFor("time_interval")}
              >
                Horario
              </button>
            </th>
            <th>
              <button>Acciones</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              id={item.patient ? item.patient.toLowerCase() : null}
              name="appointlist"
            >
              <td>{item.patient}</td>
              <td>{item.doctor}</td>
              <td>
                {formattedDate(item.date_interval)}
                <br />
                {formattedTimeWithoutSeconds(item.from_interval)} -{" "}
                {formattedTimeWithoutSeconds(item.to_interval)}
              </td>
              <td>
                <TableActionButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="screen-container">
      {showBackdrop ? <BackdropLoading /> : null}

      <div className="screen-header">
        <div className="screen-header-icon-container">
          <EventNoteIcon fontSize="large" style={{ color: "#3E43AB" }} />
        </div>
        <div className="screen-header-descriptions">
          <p className="screen-header-title">Turnos</p>
          <p className="screen-header-subtitle">Citas médicas agendadas</p>
        </div>
      </div>

      <div className="screen-content-container">
        <div className="screen-content">
          <div className="appointments-out-table">
            <div className="div-search">
              <input
                type="text"
                onChange={(e) => searchTable(e, "appointlist")}
                placeholder="Nombre del paciente..."
              />
              <i class="icon">
                <FaSearch />
              </i>
            </div>
            <Button
              variant="outlined"
              style={{ color: "#3E43AB", borderColor: "#3E43AB" }}
            >
              <AddIcon /> Agendar una cita
            </Button>
          </div>
          <ProductTable appoint={temporalData} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsScreen;

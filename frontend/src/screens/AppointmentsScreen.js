import DeleteButton from '../components/buttons/DeleteButton'
import ModifyButton from '../components/buttons/ModifyButton'
import AddButton from '../components/buttons/AddButton'
import React, { useState, useMemo, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from '../api/axios'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


const APPOINTMENT_URL = 'api/appointments'

const AppointmentsScreen = () => {

    const [temporalData, setTemporalData] = useState([]);


    useEffect(() => {
        axios.get(APPOINTMENT_URL)
        .then(response => {
          console.log('-- Data Response --');
          console.log(response.data);
          setTemporalData(response.data.data);
        })
        .catch(e => {
            console.log(e)
        })
      }, []);

    //------------- BUSCADOR DE LA TABLA --------------------------------
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

// ------------- FILTRO DE LA TABLA --------------------------------
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

// ------------- GENERA LA TABLA CON EL ARRAY DADO --------------------------------
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
            <tr key={item.id} id={item.patient ? item.patient.toLowerCase() : null } name='appointlist'>
              <td>{item.patient}</td>
              <td>{item.doctor}</td>
              <td>{item.date_interval}<br/>From: {item.from_interval}<br/>To: {item.to_interval}</td>
              <td>
                <Button id={item.uid} variant="outlined"><EditIcon fontSize="small"/></Button>
                <Button id={item.uid} variant="outlined" color='warning'><ClearIcon fontSize="small" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

    return (
        <>
        <Button variant="contained" style={{margin: '10px'}}>Registrar paciente</Button>
                <div className='div-search'>
                  <input type="text" onChange={(e) => searchTable(e, 'appointlist')} placeholder="Nombre del paciente..."/>
                  <i class="icon"><FaSearch /></i>
                </div>
                <ProductTable appoint={temporalData}/>


                <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        </>
    )
}

export default AppointmentsScreen
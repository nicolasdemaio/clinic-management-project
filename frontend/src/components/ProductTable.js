import React, { useState, useMemo } from 'react';
import TableActionButton from './buttons/TableActionButton';
import './ProductTable.css';

export const ProductTable = (props) => {
  const list_of_appoints = props.data;

  // [{ id: 1, time_interval: '8 a 9', doctor: 'Jordoctor', patient: 'Ponpaciente' }]
  if (
    list_of_appoints.length > 0 &&
    Object.keys(list_of_appoints[0]).length !== 0
  ) {
    if (list_of_appoints[0].patient.fullname) {
      for (let i = 0; list_of_appoints.length > i; i++) {
        const id = i;
        const doctor = list_of_appoints[i].doctor.fullname;
        const patient = list_of_appoints[i].patient.fullname;
        const time_interval =
          list_of_appoints[i].time_interval.from_date.split(' ')[0];
        const date_interval =
          list_of_appoints[i].time_interval.from_date.split(' ')[0];
        const from_interval =
          list_of_appoints[i].time_interval.from_date.split(' ')[1];
        const to_interval =
          list_of_appoints[i].time_interval.to_date.split(' ')[1];

        props.data[i] = {
          id: id,
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
              Paciente
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
            id={item.patient ? item.patient.toLowerCase() : undefined}
            name="producttable"
          >
            <td>{item.patient}</td>
            <td>{item.doctor}</td>
            <td>
              {formattedDate(item.date_interval)}
              <br />
              {formattedTimeWithoutSeconds(item.from_interval)} -
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

// ------------- FILTRO DE LA TABLA --------------------------------
const useSortableData = (items, config = undefined) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = items;
    if (sortConfig !== undefined) {
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

const formattedTimeWithoutSeconds = (aTime) => {
  return aTime.substring(0, 5);
};

const formattedDate = (aDate) => {
  return new Date(aDate).toLocaleDateString('es-es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default ProductTable;

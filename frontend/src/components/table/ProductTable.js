import React, { useState, useMemo } from 'react';
import TableActionButton from '../buttons/TableActionButton';
import './ProductTable.css';

export const ProductTable = (props) => {
  const list_data = props.data;
  const tableId = props.tableId || 'producttable';
  const searchParameter = props.searchParameter || 'id';

  const { items, requestSort, sortConfig } = useSortableData(list_data);
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
          {!items[0]
            ? items.push({ 'Cargando...': '' })
            : Object.keys(items[0]).map((item) => (
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort(item)}
                    className={getClassNamesFor(item)}
                  >
                    {item}
                  </button>
                </th>
              ))}
          {props.actions ? (
            <th>
              <button>Acciones</button>
            </th>
          ) : undefined}
        </tr>
      </thead>
      <tbody>
        {Object.keys(items).map((item) => (
          <tr
            key={item}
            id={items[item][searchParameter]?.toLowerCase()}
            name={tableId}
          >
            {Object.keys(items[item]).map((key) => (
              <td>{items[item][key]}</td>
            ))}
            {props.actions ? (
              <td>
                <TableActionButton />
              </td>
            ) : undefined}
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

export default ProductTable;

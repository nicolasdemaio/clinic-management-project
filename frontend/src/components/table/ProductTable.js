import React, { useState, useMemo } from 'react';
import TableActionButton from '../buttons/TableActionButton';
import './ProductTable.css';

export const ProductTable = (props) => {
  const searchParameter = Array.isArray(props.searchParameter)
    ? props.searchParameter
    : [props.searchParameter || 'id'];
  const tableId = props.tableId || 'producttable';
  const index = props.index || 'index';
  const list_data = props.data;

  const { items, requestSort, sortConfig } = useSortableData(list_data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return list_data.length ? (
    <table id="table">
      <thead>
        <tr>
          {Object.keys(items[0]).map((item) =>
            item !== 'index' ? (
              <th>
                <button
                  type="button"
                  onClick={() => requestSort(item)}
                  className={getClassNamesFor(item)}
                >
                  {item}
                </button>
              </th>
            ) : undefined
          )}
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
            id={searchParameter.map((param) =>
              items[item][param]?.toLowerCase()
            )}
            name={tableId}
            index={items[item][index]}
          >
            {Object.keys(items[item]).map((key) =>
              key !== 'index' ? <td>{items[item][key]}</td> : undefined
            )}
            {props.actions === 'custom' ? (
              props.children
            ) : props.actions ? (
              <td>
                <TableActionButton />
              </td>
            ) : undefined}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    ''
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

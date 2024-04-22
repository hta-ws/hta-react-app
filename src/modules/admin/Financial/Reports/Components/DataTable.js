import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table } from 'reactstrap';

// our pester.dev specific react-table
const DataTable = ({
  columns,
  data,
  debouncedSearchTerm,
  setGlobalFilter,
  onSelectRow,
  toggle,
}) => {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      globalFilter: debouncedSearchTerm,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    onGlobalFilterChange: setGlobalFilter,
  });
  console.log('data', data);
  // Render the UI for your table
  const handleClickRow = (row) => {
    // onReportCodeSelect fonksiyonunun tanımlı olup olmadığını kontrol eder
    if (typeof onSelectRow === 'function') {
      onSelectRow(row);
    }

    // toggle fonksiyonunun tanımlı olup olmadığını kontrol eder
    if (typeof toggle === 'function') {
      toggle();
    }
  };
  return (
    <Table className='table-hover table-striped'>
      <thead className='bg-light sticky-top'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} role='row'>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                role='columnheader'
                className={header.column.columnDef.className}
                style={{ cursor: 'pointer' }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                <span>
                  {{
                    asc: ' ▲',
                    desc: ' ▼',
                  }[header.column.getIsSorted()] ?? ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody role='rowgroup'>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              role='row'
              onClick={() => handleClickRow(row.original)}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    role='cell'
                    className={cell.column.columnDef.className}
                    style={cell.column.columnDef.cellStyle}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  debouncedSearchTerm: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  onSelectRow: PropTypes.func,
  toggle: PropTypes.func,
};
export default DataTable;

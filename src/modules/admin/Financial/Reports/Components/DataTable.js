import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Table, Spinner } from 'reactstrap';

const DataTable = ({
  columns,
  data = [], // Default to an empty array if data is null
  debouncedSearchTerm,
  setGlobalFilter,
  onSelectRow,
  toggle,
  loading, // Yeni eklenen prop
  selectedRecord,
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
  const trClass = (row) => {
    let classes = typeof onSelectRow === 'function' ? 'cursor-pointer' : '';
    if (selectedRecord && row?.id == selectedRecord?.id) {
      classes += ' table-active'; // 'active' sınıfını ekleyin
    }
    return classes;
  };

  const handleClickRow = (row) => {
    if (typeof onSelectRow === 'function') {
      onSelectRow(row);
    }
    if (typeof toggle === 'function') {
      toggle();
    }
  };
  console.log('selectedRecord', selectedRecord);
  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          className='loading-backdrop'
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // Yarı saydam beyaz arka plan
          }}
        >
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      )}
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
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={trClass(row.original)}
                onClick={() => handleClickRow(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cell.column.columnDef.className}
                    style={cell.column.columnDef.cellStyle}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className='p-6'>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                <h6> Kayıt bulunamadı...</h6>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  debouncedSearchTerm: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  onSelectRow: PropTypes.func,
  toggle: PropTypes.func,
  loading: PropTypes.bool, // Eklenen yeni prop
  selectedRecord: PropTypes.object, // Yeni prop
};

export default DataTable;

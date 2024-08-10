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
import DraggableRow from './DraggableRow';

const AppDataTable = ({
  columns,
  data = null, // Default to null if data is null
  debouncedSearchTerm,
  setGlobalFilter,
  onSelectRow,
  toggle,
  loading,
  error, // Add error prop
  selectedRecord,
  isDraggable,
  isSortable = true,
  reorderRow,
  tableClass = 'table-hover table-striped', // Default class
}) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    columns,
    data: data || [], // Provide empty array if data is null
    state: {
      sorting,
      globalFilter: debouncedSearchTerm,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: isSortable, // Use isSortable to control sorting
    onGlobalFilterChange: setGlobalFilter,
  });

  const trClass = (row) => {
    let classes = typeof onSelectRow === 'function' ? 'cursor-pointer' : '';
    if (selectedRecord && row?.id === selectedRecord?.id) {
      classes += ' table-active';
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

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          className='loading-backdrop'
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      )}
      {error ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h6>Hata: {error}</h6>
        </div>
      ) : (
        <Table className={tableClass}>
          <thead className='bg-light sticky-top'>
            <tr>
              {isDraggable && <th></th>}
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      role='columnheader'
                      className={header.column.columnDef.className}
                      style={{ cursor: isSortable ? 'pointer' : 'default' }}
                      onClick={
                        isSortable
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
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
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody role='rowgroup'>
            {data && data.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                if (isDraggable) {
                  return (
                    <DraggableRow
                      key={row.id}
                      row={row}
                      reorderRow={reorderRow}
                      onClick={handleClickRow}
                      trClass={trClass}
                    />
                  );
                } else {
                  return (
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                }
              })
            ) : (
              <tr className='p-6'>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  <h6> Kayıt bulunamadı...</h6>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

AppDataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  debouncedSearchTerm: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  onSelectRow: PropTypes.func,
  toggle: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string, // Add error prop type
  selectedRecord: PropTypes.object,
  isDraggable: PropTypes.bool,
  isSortable: PropTypes.bool, // Add isSortable prop type
  reorderRow: PropTypes.func,
  tableClass: PropTypes.string, // Add tableClass prop type
};

export default AppDataTable;

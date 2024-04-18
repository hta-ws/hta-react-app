/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
const columnHelper = createColumnHelper();

function DefinitionTable({ data, selectedRowId, setSelectedRowId }) {
  const [sorting, setSorting] = useState([]);
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => (
        <label
          id='TooltipSSize'
          className='btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center form-label'
        >
          {info.getValue()}
        </label>
      ),
    }),
    columnHelper.accessor((row) => row.report_code, {
      id: 'combined', // Birleştirilmiş sütun için unique bir id
      header: 'Rapor Kodu ve Etiket',
      cell: (info) => (
        <div className='d-flex align-items-center'>
          {/* <div className='flex-shrink-0 me-3'>
            <label
              id='TooltipSSize'
              className='btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center form-label'
            >
              {info.row.original.id}
            </label>
          </div> */}
          <div className='flex-grow-1'>
            <h5 className='fs-14 mb-1'>
              <a
                className='text-body'
                href='/velzon/react/master/apps-ecommerce-product-details'
              >
                {' '}
                {info.row.original.label}
              </a>
            </h5>
            <p className='text-muted mb-0'>
              <span className='fw-medium'> {info.getValue()}</span>
            </p>
          </div>
        </div>
        // <div
        //   style={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'center',
        //     height: '100%', // Hücrenin yüksekliği içeriği barındırmak için yeterli olmalı
        //   }}
        // >
        //   <h5>{info.row.original.label}</h5>
        //   {/* Etiket */}
        //   <p
        //   // style={{
        //   //   fontSize: 'smaller',
        //   //   // color: 'gray',
        //   //   whiteSpace: 'nowrap',
        //   // }}
        //   >
        //     {info.getValue()}
        //   </p>{' '}
        //   {/* Rapor Kodu */}
        // </div>
      ),
    }),

    columnHelper.accessor((row) => row.ifrs_code, {
      id: 'combinedTypeCode', // Birleştirilmiş sütun için benzersiz bir id
      header: 'Bilanço Tipi ve IFRS Kodu',
      cell: (info) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%', // Hücrenin yüksekliği içeriği barındırmak için yeterli olmalı
          }}
        >
          <span style={{ fontWeight: 'bold' }}>
            {info.row.original.bilanco_tipi}
          </span>{' '}
          {/* Bilanço Tipi */}
          <span
            style={{
              fontSize: 'smaller',
            }}
          >
            {info.getValue()}
          </span>{' '}
          {/* IFRS Kodu */}
        </div>
      ),
    }),
    columnHelper.accessor('actions', {
      header: () => 'Action',
      cell: () => (
        <ul className='list-inline hstack gap-2 mb-0'>
          <li className='list-inline-item' title='View'>
            <Link
              to='#'
              onClick={(e) => {
                e.preventDefault();

                //     setInfo(rowData); // Burada setInfo fonksiyonunun tanımlı olduğundan emin olun
              }}
            >
              <i className='ri-eye-fill align-bottom text-muted'></i>
            </Link>
          </li>
          <li className='list-inline-item' title='Edit'>
            <Link
              to='#'
              className='edit-item-btn'
              onClick={(e) => {
                e.preventDefault();

                //  handleCompanyClick(rowData); // Burada handleCompanyClick fonksiyonunun tanımlı olduğundan emin olun
              }}
            >
              <i className='ri-pencil-fill align-bottom text-muted'></i>
            </Link>
          </li>
          <li className='list-inline-item' title='Delete'>
            <Link
              to='#'
              className='remove-item-btn'
              onClick={(e) => {
                e.preventDefault();
                // const rowData = info.row.original;
                //  onClickDelete(rowData); // Burada onClickDelete fonksiyonunun tanımlı olduğundan emin olun
              }}
            >
              <i className='ri-delete-bin-fill align-bottom text-muted'></i>
            </Link>
          </li>
        </ul>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting, // Use the state from useState
    },
    onSortingChange: setSorting, // Update the state when sorting changes
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  const handleRowClick = (row) => {
    setSelectedRowId(row.id);
  };

  return (
    <Table className='align-middle table-nowrap table table-hover'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='text-uppercase table-light'>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getIsSorted() && (
                  <span>
                    {header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row)}
            style={{
              backgroundColor: row.id === selectedRowId ? '#007bff' : '',
              color: row.id === selectedRowId ? 'white' : '',
              cursor: 'pointer',
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td className='no-wrap truncate' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </Table>
  );
}

export default DefinitionTable;

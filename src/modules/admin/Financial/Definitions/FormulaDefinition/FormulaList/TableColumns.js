import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
// import FormulaView from '../../Components/FormulaView'; // FormulaView bileşenini kullanmak istemiyorsanız kaldırın

const columnHelper = createColumnHelper();

export const TableColumns = (selectedRow, isDraggable) => {
  const columns = [
    columnHelper.accessor('sort_order', {
      header: 'Sıralama',
      size: 50,
      cell: (info) => (
        <span className='vertical-center'>{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('s_label', {
      id: 'combined',
      size: 300,
      header: 'Rapor Kodu ve Etiket',
      cell: (info) => (
        <div
          className='d-flex align-items-center'
          style={{ maxWidth: selectedRow ? '450px' : '100%' }}
        >
          <div className='flex-grow-1'>
            <h5
              className={`fs-14 mb-1 ${selectedRow ? 'text-truncate' : ''}`}
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              <a
                className={`text-body ${selectedRow ? 'text-truncate' : ''}`}
                href='#'
                style={{ maxWidth: selectedRow ? '450px' : '100%' }}
              >
                {info.getValue()}
              </a>
            </h5>
            <p
              className={`text-muted mb-0 ${selectedRow ? 'text-truncate' : ''}`}
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              <span
                className={`fw-medium ${selectedRow ? 'text-truncate' : ''}`}
              >
                {info.row.original.s_report_code}
              </span>
            </p>
            <p
              className={`text-muted mb-0 ${selectedRow ? 'text-truncate' : ''}`}
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              <span
                className={`fw-medium ${selectedRow ? 'text-truncate' : ''}`}
              >
                {info.row.original.spDefinition?.title}
              </span>
            </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.ifrs_code, {
      id: 'combinedTypeCode',
      header: 'Bilanço Tipi ve IFRS Kodu',
      cell: (info) => (
        <div
          className='d-flex align-items-center'
          style={{ maxWidth: selectedRow ? '450px' : '100%' }}
        >
          <div className='flex-grow-1'>
            <h5
              className={`fs-14 mb-1 ${selectedRow ? 'text-truncate' : ''}`}
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              <a
                className={`text-body ${selectedRow ? 'text-truncate' : ''}`}
                href='#'
                style={{ maxWidth: selectedRow ? '450px' : '100%' }}
              >
                {info.row.original.spDefinition?.title}
              </a>
            </h5>
            <p
              className={`text-muted mb-0 ${selectedRow ? 'text-truncate' : ''}`}
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              <span
                className={`fw-medium ${selectedRow ? 'text-truncate' : ''}`}
              >
                {info.row.original.spDefinition?.description}
              </span>
            </p>
          </div>
        </div>
      ),
    }),
  ];

  if (isDraggable) {
    columns.push(
      columnHelper.accessor('sort_order', {
        header: 'Sıralama',
        size: 100,
        cell: (info) => (
          <span className='vertical-center'>{info.getValue()}</span>
        ),
      }),
    );
  }

  return columns;
};

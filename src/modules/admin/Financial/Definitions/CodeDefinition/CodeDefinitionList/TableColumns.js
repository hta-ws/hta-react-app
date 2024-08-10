// DefinitionsColumns.js
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const TableColumns = (selectedRow) => [
  columnHelper.accessor('sort_order', {
    header: 'Sıralama',
    size: 50,
    cell: (info) => <span className='vertical-center'>{info.getValue()}</span>,
  }),

  // Combined Report Code and Label column configuration
  columnHelper.accessor((row) => row.report_code, {
    id: 'combined',
    size: 500,
    header: 'Rapor Kodu ve Etiket',
    className: 'cursor-pointer',
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
            <span
              className={`text-body ${selectedRow ? 'text-truncate' : ''}`}
              href='#'
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              {info.row.original.label}
            </span>
          </h5>
          <p
            className={`text-muted mb-0 ${selectedRow ? 'text-truncate' : ''}`}
            style={{ maxWidth: selectedRow ? '450px' : '100%' }}
          >
            <span className={`fw-medium ${selectedRow ? 'text-truncate' : ''}`}>
              {info.getValue()}
            </span>
          </p>
        </div>
      </div>
    ),
  }),

  // Combined Balance Type and IFRS Code column configuration
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
            <span
              className={`text-body ${selectedRow ? 'text-truncate' : ''}`}
              href='#'
              style={{ maxWidth: selectedRow ? '450px' : '100%' }}
            >
              {info.row.original.bilanco_tipi}
            </span>
          </h5>
          <p
            className={`text-muted mb-0 ${selectedRow ? 'text-truncate' : ''}`}
            style={{ maxWidth: selectedRow ? '450px' : '100%' }}
          >
            <span className={`fw-medium ${selectedRow ? 'text-truncate' : ''}`}>
              {info.getValue()}
            </span>
          </p>
        </div>
      </div>
    ),
  }),

  // Other column definitions can be added here in similar format
];

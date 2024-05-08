// FinancialDataColumns.js
import { createColumnHelper } from '@tanstack/react-table';
import AppFormatter from '@hta/components/AppFormatter';
const columnHelper = createColumnHelper();

export const financialDataColumns = () => [
  columnHelper.accessor('item_code', {
    header: 'Item Code',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('item_desc_tr', {
    header: 'Description',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('taxonomy_title_content_tr', {
    header: 'Taxonomy Title',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('ifrs_code', {
    header: 'IFRS Code',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('value', {
    header: 'İsyatirim',
    className: 'text-end',
    cell: (info) => {
      const value = info.getValue();
      // Check if the value is 0 and render a dash if true. Otherwise, use the AppFormatter.
      return value === 0 ? (
        <div className='d-block w-100 text-end'>-</div>
      ) : (
        <AppFormatter
          value={value}
          format={{ type: 'number', decimal: 0 }}
          Tag='div'
          className='d-block w-100 text-end'
        />
      );
    },
  }),
  columnHelper.accessor('donemsel', {
    header: 'Kap',
    className: 'text-end',
    cell: (info) => {
      const value = info.getValue();
      // Check if the value is 0 and render a dash if true. Otherwise, use the AppFormatter.
      return value === 0 ? (
        <div className='d-block w-100 text-end'>-</div>
      ) : (
        <AppFormatter
          value={value}
          format={{ type: 'number', decimal: 0 }}
          Tag='div'
          className='d-block w-100 text-end'
        />
      );
    },
  }),
];

// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table';
import { fuzzyFilter } from '@hta/helpers/Utils';
import AppFormatter from '@hta/components/AppFormatter';
export const columnHelper = createColumnHelper();

export function getTableColumns() {
  return [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      enableSorting: true,
      filterFn: fuzzyFilter,
    }),
    columnHelper.accessor('taxonomy_title_content_tr', {
      cell: (info) => info.row.original.taxonomy_title_content_tr,
      header: () => <span>Açıklama</span>,
      enableSorting: true,
      filterFn: fuzzyFilter,
      //  filterFn: 'fuzzyFilter', // Bu bir fonksiyon olmalıdır, yani fonksiyonu import ettiğinizden emin olun.
    }),

    columnHelper.accessor('ifrs_code', {
      cell: (info) => info.row.original.ifrs_code,
      header: () => <span>IFRS Code</span>,
      enableSorting: true,
      filterFn: fuzzyFilter,
      //  filterFn: 'fuzzyFilter', // Bu bir fonksiyon olmalıdır, yani fonksiyonu import ettiğinizden emin olun.
    }),

    columnHelper.accessor('donemsel', {
      header: 'Donemsel',
      className: 'text-end',
      filterFn: fuzzyFilter,
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
}

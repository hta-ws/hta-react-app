// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table';
import { numberFormatter, fuzzyFilter } from '@hta/helpers/Utils';

export const columnHelper = createColumnHelper();

export function getTableColumns() {
  return [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      enableSorting: true,
      filterFn: fuzzyFilter,
    }),
    columnHelper.accessor('label', {
      cell: (info) => info.row.original.taxonomy_title_content_tr,
      header: () => <span>Açıklama</span>,
      enableSorting: true,
      filterFn: 'fuzzyFilter', // Bu bir fonksiyon olmalıdır, yani fonksiyonu import ettiğinizden emin olun.
    }),
    columnHelper.accessor('ifrs_code', {
      cell: (info) => info.row.original.ifrs_code,
      header: () => <span>ifrs_code</span>,
      enableSorting: true,
      filterFn: 'fuzzyFilter', // Bu bir fonksiyon olmalıdır, yani fonksiyonu import ettiğinizden emin olun.
    }),

    columnHelper.accessor('value1', {
      cell: (info) => {
        return typeof info.getValue() === 'number' && info.getValue() !== 0
          ? numberFormatter.format(info.getValue())
          : '';
      },
      header: () => <span>Bu Dönem</span>,
      enableSorting: true,
      cellStyle: { textAlign: 'right' },
    }),
    columnHelper.accessor('value2', {
      cell: (info) => {
        return typeof info.getValue() === 'number' && info.getValue() !== 0
          ? numberFormatter.format(info.getValue())
          : '';
      },
      header: () => <span>Önceki Dönem</span>,
      enableSorting: true,
      cellStyle: { textAlign: 'right' },
      className: 'text-right',
    }),
  ];
}

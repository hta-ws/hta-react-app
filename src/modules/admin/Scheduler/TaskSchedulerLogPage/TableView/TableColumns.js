// DefinitionsColumns.js
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();
import LogCell from '../../TaskSchedulerPage/TableView/componets/LogCell';
export const TableColumns = () => [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('source_hr', {
    header: 'Kaynak',
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.accessor('method_hr', {
    header: 'Metot',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Durum',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('start_date_time', {
    header: 'Başlangıç Zamanı',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('humanReadableExecutionTime', {
    header: ' Çalışma Süresi',
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.accessor(
    (row) => row, // accessor function to get the value from the row
    {
      id: 'logOutput', // a unique identifier for the column
      header: 'Son Çalışma Sonucu',

      cell: (info) => (
        <LogCell
          value={info.getValue().output}
          title={info.getValue().source_hr}
          rowId={info.row.id}
        />
      ),
      enableSorting: false, // Disable sorting for this column
    },
  ),

  // Other column definitions can be added here in similar format
];

// tableColumns.js
import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import ActionCell from './ActionCell'; // Adjust the import path as needed
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import LogCell from './LogCell';

const columnHelper = createColumnHelper();

export const SchedulerListColumns = (actions) => [
  columnHelper.accessor('methodSource', {
    header: () => <span>Kaynak</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('commentDescription', {
    header: () => <span>Acıklama</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor(
    (row) => row.next_run_date, // This function gets the value from the row
    {
      id: 'cronDescription', // Unique ID for the column
      header: 'Kurulum Bilgisi',
      cell: (task) => (
        <>
          <div className='d-flex align-items-center'>
            <div className='flex-grow-1'>
              <h5 className='fs-14 mb-1 text-wrap'>
                {task.row.original.cronDescription} çalışır.
              </h5>
              <p className='text-muted mb-0'>
                {task.row.original.statusId === 1 ? (
                  <span className='fw-medium'>
                    {task.row.original.remainingTimeToRun} sonra çalışacak.
                  </span>
                ) : (
                  <span className='fw-medium'>
                    {task.row.original.statusName} Durumda
                  </span>
                )}
              </p>
            </div>
          </div>
        </>
      ),
    },
  ),

  columnHelper.accessor(
    (row) => row.next_run_date, // This function gets the value from the row
    {
      id: 'cronDescription2', // Unique ID for the column
      header: 'Son Çalışma Bilgisi',
      cell: (task) => {
        return (
          <div className='d-flex align-items-center'>
            <div className='flex-grow-1'>
              <h5 className='fs-14 mb-1 text-wrap'>
                {task.row.original.lastRunDate
                  ? format(
                      new Date(task.row.original.lastRunDate),
                      'd MMM eeee, HH:mm:ss',
                      {
                        locale: tr,
                      },
                    )
                  : 'Henüz çalışmadı.'}
              </h5>
              <p className='text-muted mb-0'>
                <span className='fw-medium'>
                  {task ? <>{task.row.original.executionTime} sürdü.</> : ''}
                </span>
              </p>
            </div>
          </div>
        );
      },
    },
  ),

  columnHelper.accessor(
    (row) => row, // accessor function to get the value from the row
    {
      id: 'logOutput', // a unique identifier for the column
      header: 'Son Çalışma Sonucu',

      cell: (info) => (
        <LogCell
          value={info.getValue().logOutput}
          title={info.getValue().commentDescription}
          rowId={info.row.id}
        />
      ),
      enableSorting: false, // Disable sorting for this column
    },
  ),
  // ... other similar column definitions
  // columnHelper.accessor(
  //   (row) => row.log, // assuming 'log' is the field in your data
  //   {
  //     id: 'log',
  //     header: 'Son Çalışma Bilgisi',
  //     cell: (info) => {
  //       console.log(info);
  //     },
  //     enableSorting: false,
  //   },
  // ),

  columnHelper.accessor('statusName', {
    header: 'Durum',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'action',
    header: 'Actions',
    cell: (cellProps) => ActionCell(cellProps, actions),
  }),
  // ... add more columns as needed
];

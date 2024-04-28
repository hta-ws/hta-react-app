import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Card, CardBody, CardHeader, Row, Col, Input, Table } from 'reactstrap';
import AppFinancialStatementFormatSelect from '@hta/components/AppInputs/AppFinancialStatementFormatSelect';
import { Columns } from './Columns';
import { StyledSimpleBar } from './styled';
import AppApiStatusHandler from '@hta/components/AppApiStatusHandler';
const TableView2 = ({
  apiData,
  selectedRow,
  setSelectedRow,
  financialStatementFormatCode,
  setFinancialStatementFormatCode,
  refreshTable,
  error,
  loading,
}) => {
  const [sorting, setSorting] = useState([]);
  const addNewRecord = () => {
    console.log('addNewRecord');
    setSelectedRow({
      financial_statement_format_code: financialStatementFormatCode,
      is_locked: 0,
    });
  };
  const refreshData = () => {
    refreshTable();
  };
  const columns = Columns(selectedRow);
  const table = useReactTable({
    data: apiData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });
  console.log('apiData', apiData);
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Bilanço dan alaınacak veri yönetim ekranı</h5>
        <AppFinancialStatementFormatSelect
          financialStatementFormatCode={financialStatementFormatCode}
          setFinancialStatementFormatCode={setFinancialStatementFormatCode}
        />
      </CardHeader>
      <CardBody>
        <Row className='g-0 mt-0'>
          <Col md={6}>
            <div className='search-box'>
              <Input
                type='text'
                className='form-control search'
                placeholder='Listede ara...'
              />
              <i className='ri-search-line search-icon'></i>
            </div>
          </Col>
          <div className='col-md-auto ms-auto'>
            <div className='d-flex hastck gap-2 flex-wrap'>
              <button className='btn btn-success' onClick={addNewRecord}>
                <i className='ri-add-fill align-bottom me-1'></i> Yeni Hesaplama
                Ekle
              </button>
              <button
                className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
                onClick={refreshData}
              >
                <i className='ri-refresh-line align-bottom me-1'></i>
              </button>
            </div>
          </div>
        </Row>
        <StyledSimpleBar>
          {loading || error ? (
            <AppApiStatusHandler
              loading={loading}
              error={error}
              onRetry={refreshData}
            />
          ) : (
            <Table className='align-middle table-nowrap  table-hover mt-1'>
              <colgroup>
                {table.getAllLeafColumns().map((column) => (
                  <col
                    key={column.id}
                    style={{ width: column.getSize() || '200px' }}
                  />
                ))}
              </colgroup>
              <thead className='bg-light sticky-top'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className='text-uppercase  '>
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
                            {header.column.getIsSorted() === 'desc'
                              ? ' 🔽'
                              : ' 🔼'}
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
                    onClick={() => setSelectedRow(row.original)}
                    // style={{
                    //   backgroundColor: row.id === selectedRow ? '#007bff' : '',
                    //   color: row.id === selectedRow ? 'white' : '',
                    //   cursor: 'pointer',
                    // }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className='no-wrap truncate' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
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
          )}
        </StyledSimpleBar>
      </CardBody>
    </Card>
  );
};

TableView2.propTypes = {
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func.isRequired,
  apiData: PropTypes.array.isRequired,
  financialStatementFormatCode: PropTypes.number.isRequired,
  setFinancialStatementFormatCode: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  refreshTable: PropTypes.func.isRequired,
};

export default TableView2;

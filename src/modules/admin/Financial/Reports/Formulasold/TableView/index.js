import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import { FormatSelect } from '../../Components'; // Ensure the path matches your project structure
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentPopulationRecord } from 'toolkit/actions'; // Ensure this action is properly imported
import { Columns } from './Columns';
import AppApiStatusHandler from '@hta/components/AppApiStatusHandler'; // Status handler component
import { TableViewBar } from '../styled';
import DataTable from '../../Components/DataTable';
import SearchBox from '../../Components/IfrsCodeSelect/SearchBox';
import { useDebounce } from '@hta/hooks/useDebounce';
const TableView = ({ loading, apiData, error, refreshData }) => {
  const dispatch = useDispatch();

  const [globalFilter, setGlobalFilter] = useState('');
  const {
    financialStatementFormatId = null,
    selectedPopulationRecord: selectedRow = null,
  } = useSelector((state) => state.admin || {});

  const setSelectedRow = (data) => {
    const recordData = data || {
      financial_statement_format_id: financialStatementFormatId, // Default to the value from state
      is_locked: 0, // Default value if no specific data is provided
    };
    console.log('recordData', recordData);
    dispatch(setCurrentPopulationRecord(recordData));
  };

  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const columns = Columns(selectedRow);

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Bilançodan Alınacak Kodların Tanımlama Ekranı</h5>
        <FormatSelect />
      </CardHeader>
      <CardBody>
        <Row className='g-2 mt-0 mb-2'>
          <Col md={6}>
            {/* <div className='search-box'>
              <Input
                type='text'
                className='form-control search'
                placeholder='Search in list...'
              />
              <i className='ri-search-line search-icon'></i>
            </div> */}
            <SearchBox value={globalFilter} onChange={setGlobalFilter} />
          </Col>
          <Col className='col-md-auto ms-auto '>
            <button
              className='btn btn-success me-2'
              onClick={() =>
                setSelectedRow({
                  financial_statement_format_id: financialStatementFormatId,
                })
              }
            >
              <i className='ri-add-fill align-bottom me-1'></i> Add New Code
            </button>
            <button
              className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
              onClick={refreshData}
            >
              <i className='ri-refresh-line align-bottom me-1'></i>
            </button>
          </Col>
        </Row>
        <TableViewBar>
          {loading || error ? (
            <AppApiStatusHandler
              loading={loading}
              error={error}
              onRetry={refreshData}
            />
          ) : (
            <Row>
              <Col md={12}>
                <DataTable
                  data={apiData}
                  columns={columns}
                  onSelectRow={setSelectedRow}
                  debouncedSearchTerm={debouncedSearchTerm}
                  setGlobalFilter={setGlobalFilter}
                />
              </Col>
              {/* <Col md={6}>
                <Table className='align-middle table-nowrap table-hover mt-1'>
                  <colgroup>
                    {table.getAllLeafColumns().map((column) => (
                      <col
                        key={column.id}
                        style={{ width: column.getSize() || 'auto' }}
                      />
                    ))}
                  </colgroup>
                  <thead className='bg-light sticky-top'>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
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
                        className='cursor-pointer'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
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
              </Col> */}
            </Row>
          )}
        </TableViewBar>
      </CardBody>
    </Card>
  );
};
TableView.propTypes = {
  apiData: PropTypes.array.isRequired,
  refreshData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default TableView;

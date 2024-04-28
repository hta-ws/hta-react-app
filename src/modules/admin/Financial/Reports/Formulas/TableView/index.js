import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import AppApiStatusHandler from '@hta/components/AppApiStatusHandler';
import { useDebounce } from '@hta/hooks/useDebounce';

import SearchBox from '../../Components/SearchBox';
import FormatSelect from '../../Components/FormatSelect';
import { TableViewBar } from '../../Components/styled';
import { TableColumns } from './TableColumns';
import DataTable from '../../Components/DataTable';
import { setSelectedFormulaRecord } from 'toolkit/actions';
import { selectFinancialStatementFormatId } from 'toolkit/selectors/adminSelectors';
import { selectSelectedFormulaRecord } from 'toolkit/selectors/adminSelectors';
const TableView = ({ apiStates, apiActions }) => {
  const dispatch = useDispatch();
  const { loading, error, apiData = [] } = apiStates;
  const [globalFilter, setGlobalFilter] = useState('');
  const selectedFormulaRecord = useSelector(selectSelectedFormulaRecord);
  const columns = TableColumns(selectedFormulaRecord);
  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const { setQueryParams } = apiActions;
  const financialStatementFormatId = useSelector(
    selectFinancialStatementFormatId,
  );
  useEffect(() => {
    setQueryParams({ financialStatementFormatId: financialStatementFormatId });
    dispatch(setSelectedFormulaRecord(null));
  }, [financialStatementFormatId]);
  const refreshData = () => {
    setQueryParams({ financialStatementFormatId: financialStatementFormatId });
  };
  const setSelectedRow = (data) => {
    const recordData = data || {
      financial_statement_format_id: financialStatementFormatId, // Default to the value from state
      is_locked: 0, // Default value if no specific data is provided
    };
    dispatch(setSelectedFormulaRecord(recordData));
  };

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Bilanço Rasyo Tanımlama</h5>
        <FormatSelect />
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={6}>
            <SearchBox value={globalFilter} onChange={setGlobalFilter} />
          </Col>
          <Col className='col-md-auto ms-auto '>
            <Button
              className='btn btn-success me-2'
              onClick={() => setSelectedRow(null)}
            >
              <i className='ri-add-fill align-bottom me-1'></i>
              Yeni Kayıt Ekle
            </Button>
            <Button
              className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
              onClick={refreshData}
            >
              <i className='ri-refresh-line align-bottom me-1'></i>
            </Button>
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
            </Row>
          )}
        </TableViewBar>
      </CardBody>
    </Card>
  );
};
TableView.propTypes = {
  apiStates: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    apiData: PropTypes.any, // Specify more specific types based on your data
  }),
  apiActions: PropTypes.shape({
    setQueryParams: PropTypes.func,
  }),
};
export default TableView;

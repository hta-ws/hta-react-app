import React, { useState, useEffect } from 'react';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { Row, Col } from 'reactstrap';
import TableView from './TableView';
import FromView from './FormView';
const Formulas = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [financialStatementFormatCode, setFinancialStatementFormatCode] =
    useState(1);
  const [{ loading, apiData, error }, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-report-calculation-definitions',
    [],
    { financialStatementFormatId: 1 },
    true,
    null,
    'GET',
  );
  const refreshTable = () => {
    setSelectedRow(null);
    setQueryParams({
      financialStatementFormatId: financialStatementFormatCode,
    });
  };
  useEffect(() => {
    setQueryParams({
      financialStatementFormatId: financialStatementFormatCode,
    });
  }, [financialStatementFormatCode]);
  console.log('apiData', apiData);
  return (
    <Row className='g-1'>
      <Col md={selectedRow ? '6' : '4'}>
        <TableView
          apiData={apiData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          financialStatementFormatCode={financialStatementFormatCode}
          setFinancialStatementFormatCode={setFinancialStatementFormatCode}
          refreshTable={refreshTable}
          loading={loading}
          error={error}
        />
      </Col>
      {selectedRow && (
        <Col md={6}>
          <FromView selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
        </Col>
      )}
    </Row>
  );
};

export default Formulas;

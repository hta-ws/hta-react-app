import React, { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';

import { useGetDataApi } from '@hta/hooks/APIHooks';
import DefinitionsTable from './DefinitionsTable';
import DefinitionsForm from './DefinitionsForm';

const Definitions = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [financialStatementFormatCode, setFinancialStatementFormatCode] =
    useState(1);
  const [localApiData, setLocalApiData] = useState([]);

  const [{ loading, apiData, error }, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-report-code-definitions',
    [],
    { financialStatementFormatCode: financialStatementFormatCode },
    false,
    null,
    'POST',
  );
  useEffect(() => {
    setLocalApiData(apiData); // Initialize localApiData whenever apiData changes
  }, [apiData]);
  const refreshTable = () => {
    setQueryParams({
      financialStatementFormatCode: financialStatementFormatCode,
    });
  };
  useEffect(() => {
    setSelectedRow(null);
    setQueryParams({
      financialStatementFormatCode: financialStatementFormatCode,
    });
  }, [financialStatementFormatCode]);
  const updateApiData = (updatedRow, action = 'update') => {
    let newData;

    if (action === 'update') {
      const exists = localApiData.some((row) => row.id === updatedRow.id);
      if (exists) {
        // Update the existing row
        newData = localApiData.map((row) =>
          row.id === updatedRow.id ? { ...row, ...updatedRow } : row,
        );
      } else {
        // Add the new row if it doesn't exist
        newData = [...localApiData, updatedRow];
      }
    } else if (action === 'remove') {
      // Remove the row
      newData = localApiData.filter((row) => row.id !== updatedRow.id);
    }

    setLocalApiData(newData); // Update local state
    // Optionally, sync changes with your server here
  };

  return (
    <Row className='g-1'>
      <Col md={selectedRow ? '6' : '12'}>
        <DefinitionsTable
          setSelectedRow={setSelectedRow}
          selectedRow={selectedRow}
          financialStatementFormatCode={financialStatementFormatCode}
          setFinancialStatementFormatCode={setFinancialStatementFormatCode}
          apiData={localApiData}
          refreshTable={refreshTable}
          loading={loading}
          error={error}
        />
      </Col>
      {selectedRow && (
        <Col md={6}>
          <DefinitionsForm
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            refreshTable={refreshTable}
            updateApiData={updateApiData}
            financialStatementFormatCode={financialStatementFormatCode}
            setFinancialStatementFormatCode={setFinancialStatementFormatCode}
          />
        </Col>
      )}
    </Row>
  );
};

export default Definitions;

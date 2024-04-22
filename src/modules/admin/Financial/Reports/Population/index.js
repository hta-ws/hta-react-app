import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap'; // Assuming you're using Reactstrap
import FormView from './FormView';
import TableView from './TableView';
import { setCurrentPopulationRecord } from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooks';
const Population = () => {
  const dispatch = useDispatch();
  const {
    financialStatementFormatId = null,
    selectedPopulationRecord: selectedRow = null,
  } = useSelector((state) => state.admin || {});

  const [{ loading, apiData, error }, { setQueryParams, updateApiData }] =
    useGetDataApi(
      'financial-management',
      'get-report-code-definitions',
      [],
      { financialStatementFormatId },
      false,
      null,
      'POST',
    );

  useEffect(() => {
    dispatch(setCurrentPopulationRecord(null));
    setQueryParams({ financialStatementFormatId });
  }, [financialStatementFormatId, setQueryParams]);
  const refreshData = () => {
    setQueryParams({
      financialStatementFormatId: financialStatementFormatId,
    });
  };
  console.log('apiData', apiData);
  return (
    <Row>
      <Col md={selectedRow ? '6' : '12'}>
        <TableView
          loading={loading}
          apiData={apiData}
          error={error}
          refreshData={refreshData}
        />
      </Col>
      {selectedRow && (
        <Col md={6}>
          <FormView updateApiData={updateApiData} />
        </Col>
      )}
    </Row>
  );
};

export default Population;

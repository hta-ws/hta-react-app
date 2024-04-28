import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap'; // Assuming you're using Reactstrap
import FormView from './FormView';
import TableView from './TableView';
import { setCurrentPopulationRecord } from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';
import { withRouter } from '@hta/hooks/withRouter';
import AppMetaTags from '@hta/components/AppMetaTags';
const Population = () => {
  const title = 'Rapor Formul ve Hesaplama Tanımlamaaları';
  const description = 'Rapor Kodları ve Etiketleri Tanımlamak için hzarılandı.';
  const dispatch = useDispatch();
  const {
    financialStatementFormatId = null,
    selectedPopulationRecord: selectedRow = null,
  } = useSelector((state) => state.admin || {});

  const [{ loading, apiData, error }, { setQueryParams, updateApiData }] =
    useGetDataApi(
      'financial-management',
      'get-report-calculation-codes',
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

  return (
    <>
      <AppMetaTags title={title} description={description} />
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
    </>
  );
};

export default withRouter(Population);

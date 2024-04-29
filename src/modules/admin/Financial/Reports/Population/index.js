import React from 'react';

import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

import AppMetaTags from '@hta/components/AppMetaTags';
import { selectSelectedPopulationRecord } from 'toolkit/selectors/adminSelectors';
import TableView from './TableView';
import FormView from './FormView';
import { useGetDataApi } from '@hta/hooks/APIHooks';

const Population = () => {
  const title = 'Rapor Formul ve Hesaplama Tanımlamaaları';
  const description = 'Rapor Kodları ve Etiketleri Tanımlamak için kullanılır';
  const selectedRecord = useSelector(selectSelectedPopulationRecord);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'financial-statement-management',
    action: 'get-population-code-list',
    method: 'POST',
    initialData: [],
  });

  return (
    <>
      <AppMetaTags title={title} description={description} />
      <Row className='gx-2'>
        <Col md={selectedRecord ? '6' : '12'}>
          <TableView apiStates={apiStates} apiActions={apiActions} />
        </Col>
        {selectedRecord && (
          <Col md={6}>
            <FormView updateApiData={apiActions.updateApiData} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Population;

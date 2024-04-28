import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import AppMetaTags from '@hta/components/AppMetaTags';
import { selectSelectedFormulaRecord } from 'toolkit/selectors/adminSelectors';

import TableView from './TableView';
import FormView from './FormView';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { getSpMetadataList } from 'toolkit/actions';
const Formulas = () => {
  const dispatch = useDispatch();
  const title = 'Rapor Formul ve Hesaplama Tanımlamaaları';
  const description = 'Rapor Kodları ve Etiketleri Tanımlamak için kullanılır';
  const selectedRecord = useSelector(selectSelectedFormulaRecord);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'financial-statement-management',
    action: 'get-formula-list',
    method: 'POST',
    initialData: [],
  });
  useEffect(() => {
    dispatch(getSpMetadataList());
  }, [dispatch]);
  return (
    <>
      <AppMetaTags title={title} description={description} />
      <Row className='gx-2'>
        <Col md={selectedRecord ? '6' : '12'}>
          <TableView apiStates={apiStates} apiActions={apiActions} />
        </Col>
        {selectedRecord && (
          <Col md={6}>
            <FormView updateTableData={apiActions.updateApiData} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Formulas;

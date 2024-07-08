import React, { useEffect } from 'react';
import { Button, Card, CardBody, Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import SimpleBar from 'simplebar-react';

import AppAlert from '@hta/components/AppAlert';
import AppFormatter from '@hta/components/AppFormatter';
import { selectFsTemplateId } from 'toolkit/selectors';

const ResultTab = () => {
  const { id } = useParams();
  const selectedTemplateId = useSelector(selectFsTemplateId);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'definition',
    action: 'get-code-definition-result-list',
    method: 'POST',
    initialData: [],
  });

  const { loading, apiData, error } = apiStates;
  const { setQueryParams } = apiActions;

  const handleRefresh = () => {
    setQueryParams({
      fs_code_definition_id: id,
      fs_template_id: selectedTemplateId,
    });
  };

  useEffect(() => {
    if (id && selectedTemplateId) {
      handleRefresh();
    }
  }, [id, selectedTemplateId, setQueryParams]);

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={6}>{loading && <p>Loading...</p>}</Col>
          <Col className='col-md-auto ms-auto '>
            <Button
              className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
              onClick={handleRefresh}
            >
              <i className='ri-refresh-line align-bottom me-1'></i>
            </Button>
          </Col>
        </Row>
        {error && (
          <Row className='mt-2'>
            <Col md='12'>
              <AppAlert
                color='danger'
                strongMessage='İşleminiz sırasında bir hata oluştu:'
                message={error}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <div style={{ height: 'calc(100vh - 360px)' }}>
              <SimpleBar style={{ height: 'calc(100vh - 360px)' }}>
                <Table
                  responsive
                  className='table table-bordered table-hover table-striped'
                >
                  <thead>
                    <tr>
                      <th colSpan='9' className='text-center'>
                        {apiData && apiData.length > 0
                          ? apiData[0].report_code
                          : ''}
                      </th>
                    </tr>
                    <tr>
                      <th>No</th>
                      <th>Hisse Adı</th>
                      <th className='text-center'>Period</th>
                      <th className='text-end'>Çeyreklik</th>
                      <th className='text-end'>Dönemsel</th>
                      <th className='text-end'>a_Dönemsel</th>
                      <th className='text-end'>Yıllıklandırılmış</th>
                      <th className='text-end'>EM Yıllıklandırılmış</th>
                      <th>Hesaplama Zamanı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData && apiData.length > 0 ? (
                      apiData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.stock_code}</td>
                          <td className='text-center'>{item.period}</td>
                          <td className='text-end'>
                            <AppFormatter
                              value={item.c}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                          <td className='text-end'>
                            <AppFormatter
                              value={item.d}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                          <td className='text-end'>
                            <AppFormatter
                              value={item.a_d}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                          <td className='text-end'>
                            <AppFormatter
                              value={item.y}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                          <td className='text-end'>
                            <AppFormatter
                              value={item.a_y}
                              format={{ type: 'number', decimal: 2 }}
                              Tag='div'
                              className='d-block w-100'
                            />
                          </td>
                          <td>
                            {format(
                              new Date(item.created_at),
                              'd MMM eeee, HH:mm:ss',
                              {
                                locale: tr,
                              },
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='9' className='text-center'>
                          Kayıt Bulunamadı
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </SimpleBar>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ResultTab.propTypes = {
  formikValues: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming `id` is a number
  }),
};

export default ResultTab;

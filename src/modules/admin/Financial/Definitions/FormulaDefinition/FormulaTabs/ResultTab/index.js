import React, { useEffect } from 'react';
import { Button, Card, CardBody, Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetDataApi } from '@hta/hooks/APIHooks';

import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import AppAlert from '@hta/components/AppAlert';
import AppFormatter from '@hta/components/AppFormatter';

import { selectFsTemplateId } from 'toolkit/selectors';

const ResultTab = ({ formikValues }) => {
  const { id } = useParams(); // Use id from URL parameters
  const fsTemplateId = useSelector(selectFsTemplateId);
  const [apiStates, apiActions] = useGetDataApi({
    controller: 'formula-definition',
    action: 'get-formula-result-list',
    method: 'POST',
    initialData: [],
  });

  const calculationId = formikValues?.id;
  const { loading, apiData, error } = apiStates;
  const { setQueryParams } = apiActions;

  const handleRefresh = () => {
    setQueryParams({
      fs_formula_id: id,
      fs_template_id: fsTemplateId,
    });
  };

  useEffect(() => {
    handleRefresh();
  }, [calculationId, setQueryParams]);

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
            <Table
              responsive
              className='table table-bordered table-hover table-striped'
            >
              <thead>
                <tr>
                  <th colSpan='8' className='text-center'>
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
                  <th className='text-end'>EM Çeyreklik</th>
                  <th className='text-end'>EM Dönemsel</th>
                  <th>Hesaplama Zamanı</th>
                </tr>
              </thead>
              <tbody>
                {apiData && apiData.length > 0 ? (
                  apiData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
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
                          value={item.a_c}
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
                    <td colSpan='8' className='text-center'>
                      Kayıt Bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ResultTab.propTypes = {
  formikValues: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming `id` is a number
  }).isRequired,
};

export default ResultTab;

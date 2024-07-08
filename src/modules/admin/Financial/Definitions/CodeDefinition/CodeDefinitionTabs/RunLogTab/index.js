import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDataApi } from '@hta/hooks/APIHooks'; // Adjust the import path as necessary
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe için
import { formatTime } from '@hta/helpers/Utils'; // formatTime
import AppAlert from '@hta/components/AppAlert';

const RunLogTab = () => {
  const runAction = 'run-fs-code-definition-job';
  const [apiStates, apiActions] = useGetDataApi({
    controller: 'definition',
    action: 'get-fs-code-definition-run-log-list',
    method: 'POST',
    initialData: [],
  });
  const { id } = useParams();

  const { loading, apiData, error } = apiStates;
  const { setQueryParams } = apiActions;
  const params = { fs_code_definition_id: id };
  useEffect(() => {
    setQueryParams(params);
  }, [id, setQueryParams]);

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={6}>{loading && <p>Loading...</p>}</Col>
          <Col className='col-md-auto ms-auto '>
            <Button
              className='btn btn-success me-2'
              onClick={() => setQueryParams(params, runAction)}
              disabled={!apiData?.canRunJob}
            >
              <i className=' ri-stack-fill align-bottom me-1'></i>
              Hesaplamayı Yeniden Çalıştır
            </Button>
            <Button
              className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
              onClick={() => setQueryParams(params)}
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
                  <th>No</th>
                  <th>Durumu</th>
                  <th>Kurulum saati</th>
                  <th>Calısma saati</th>
                  <th>Çalışma süresi</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {apiData &&
                  apiData.data &&
                  apiData.data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.status}</td>
                      <td>
                        {format(
                          new Date(item.job_scheduler_at),
                          'd MMM eeee, HH:mm:ss',
                          {
                            locale: tr,
                          },
                        )}
                      </td>
                      <td>
                        {item.job_run_at
                          ? format(
                              new Date(item.job_run_at),
                              'd MMM eeee, HH:mm:ss',
                              {
                                locale: tr,
                              },
                            )
                          : 'Bekliyor'}
                      </td>
                      <td>{formatTime(item.job_execution_time)}</td>
                      <td>{item.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

RunLogTab.propTypes = {
  formData: PropTypes.shape({
    id: PropTypes.number, // Assuming `id` is a number
  }),
};

export default RunLogTab;

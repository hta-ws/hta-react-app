import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGetDataApi } from '@hta/hooks/APIHooks'; // Adjust the import path as necessary
import { Card, CardBody, Row, Col, Table, Button } from 'reactstrap';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe için
import { formatTime } from '@hta/helpers/Utils'; // formatTime
import AppAlert from '@hta/components/AppAlert';

const RunLogTab = ({ entityType, entityLevel }) => {
  const runAction = 'run-job';
  const { id } = useParams();

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'run',
    action: 'get-run-log-list',
    method: 'POST',
    initialData: [],
  });

  const { loading, apiData, error } = apiStates;
  const { setQueryParams, submitData } = apiActions;

  const params = {
    entity_id: id,
    entity_type: entityType,
    entity_level: entityLevel,
  };

  useEffect(() => {
    setQueryParams(params);
  }, [id, entityType, entityLevel, setQueryParams]);

  const handleDelete = (logId) => {
    const deleteParams = { id: logId };
    submitData(deleteParams, 'DELETE', 'delete-run-log', () => {
      // Refresh the log list after delete
      setQueryParams(params);
    });
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={6}>{loading && <p>Loading...</p>}</Col>
          <Col className='col-md-auto ms-auto'>
            <Button
              className='btn btn-success me-2'
              onClick={() => setQueryParams(params, runAction)}
              disabled={!apiData?.canRunJob}
            >
              <i className='ri-stack-fill align-bottom me-1'></i>
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
              className='table table-striped table-nowrap align-middle mb-0'
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Durumu</th>
                  <th>Kurulum saati</th>
                  <th>Çalışma saati</th>
                  <th>Çalışma süresi</th>
                  <th>Note</th>
                  <th>Aksiyon</th>
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
                      <td>
                        {(item.status_id === 1 || item.status_id === 2) && (
                          <Button
                            className='btn btn-sm btn-light'
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className='ri-delete-bin-line'></i>
                          </Button>
                        )}
                      </td>
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
  entityType: PropTypes.string.isRequired, // 'code' veya 'formula'
  entityLevel: PropTypes.string.isRequired, // 'id' veya 'template'
};

export default RunLogTab;

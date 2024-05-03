import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import Select from 'react-select';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { useSelectOptionsFromTableData } from '@hta/hooks/useSelectOptionsFromTableData';
import { TableViewBar } from './styled';

import AppMetaTags from '@hta/components/AppMetaTags';
import TableView from './TableView';
import FormView from './FormView';
const TaskSchedulerPage = () => {
  const title = 'İş Görevi Günlüğü Görüntüleme';
  const description = 'İş Görevi Günlüğü Görüntüleme';
  const { viewmode = 'list' } = useParams();
  const [sourceFilter, setSourceFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'scheduler',
    action: 'get-scheduler-list',
    method: 'POST',
    initialData: [],
  });

  const { apiData, loading } = apiStates;
  const { setQueryParams, submitData } = apiActions;
  useEffect(() => {
    apiActions.setQueryParams();
  }, []);

  useEffect(() => {
    // Apply both source and status filters
    let newData = apiData;
    if (sourceFilter) {
      newData = newData.filter(
        (item) => item.methodSource === sourceFilter.value,
      );
    }
    if (statusFilter) {
      newData = newData.filter(
        (item) => item.statusName === statusFilter.value,
      );
    }
    setFilteredData(newData);
  }, [sourceFilter, statusFilter, apiData]); // Add statusFilter to dependency array

  const selectSourceOptions = useSelectOptionsFromTableData(
    apiData,
    'methodSource',
    'methodSource',
    { value: '', label: 'Hepsi' },
  );

  const selectStatusOptions = useSelectOptionsFromTableData(
    apiData,
    'statusName',
    'statusName',
    { value: '', label: 'Hepsi' },
  );
  const handleRefresh = () => {
    setQueryParams({});
    setSourceFilter(null);
    setStatusFilter(null);
  };
  return (
    <>
      <AppMetaTags title={title} description={description} />
      <Row>
        <Col xl={viewmode === 'edit' ? 7 : 12} md={12}>
          <Card>
            <CardHeader>
              <Row className='g-3'>
                <Col sm={3}>
                  <Select
                    value={sourceFilter}
                    isClearable
                    onChange={(newValue) => setSourceFilter(newValue)}
                    options={selectSourceOptions}
                    placeholder='Kaynak seçiniz...'
                    name='sourceSelect'
                  />
                </Col>
                <Col sm={viewmode === 'edit' ? 3 : 3}>
                  <Select
                    value={statusFilter}
                    isClearable
                    onChange={(newValue) => setStatusFilter(newValue)}
                    options={selectStatusOptions}
                    placeholder='Statu Seçiniz...'
                    name='statusSelect'
                  />
                </Col>
                <Col sm='auto' className='ms-auto'>
                  <div className='d-flex flex-wrap gap-2'>
                    <Button
                      to='/admin/scheduler/edit'
                      className='btn btn-light waves-effect waves-light'
                      onClick={() => setQueryParams({})}
                      disabled={loading}
                    >
                      <i className='ri-refresh-line align-bottom me-1'></i>
                      Yenile
                    </Button>

                    <Link to='/admin/task/log' className='btn btn-light ml-2'>
                      <i className='ri-equalizer-fill align-bottom me-1'></i>
                      Loglar
                    </Link>
                    {viewmode == 'list' && (
                      <Link
                        to='/admin/task/edit'
                        className='btn btn-light ml-2'
                      >
                        <i className='ri-add-line align-bottom me-1'></i> Yeni
                        Görev Ekle
                      </Link>
                    )}
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <TableViewBar>
                <TableView
                  data={filteredData}
                  submitData={submitData}
                  handleRefresh={handleRefresh}
                  loading={loading}
                />
              </TableViewBar>
            </CardBody>
          </Card>
        </Col>
        {viewmode == 'edit' && (
          <div className='col-xl-5 col-md-12'>
            <FormView onRefreshTable={setQueryParams} />
          </div>
        )}
      </Row>
    </>
  );
};

export default TaskSchedulerPage;

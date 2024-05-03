import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import TableView from './TableView';

import { useGetDataApi } from '@hta/hooks/APIHooks';
const TaskSchedulerLogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'scheduler',
    action: 'get-log-list',
    method: 'POST',
    initialData: [],
  });
  const { setQueryParams } = apiActions;
  useEffect(() => {
    setQueryParams({ id: id });
  }, [id]);
  const title = 'Görev Logları';
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>
          <span className=''> {title}</span>
        </h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={() => navigate('/admin/task/list')}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
        <TableView data={apiStates.apiData}></TableView>
      </CardBody>
    </Card>
  );
};

export default TaskSchedulerLogPage;

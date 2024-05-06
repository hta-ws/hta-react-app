import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import TableView from './TableView';

import { useGetDataApi } from '@hta/hooks/APIHooks';
import { TableViewBar } from '../TaskSchedulerPage/styled';
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
  const { loading } = apiStates;
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
        <div className='d-flex flex-wrap gap-2'>
          <Button
            className='btn btn-light waves-effect waves-light'
            onClick={() => setQueryParams({ id: id })}
            disabled={loading}
          >
            {loading ? (
              <i className='ri-loader-4-line rotate-infinite align-bottom me-1'></i>
            ) : (
              <i className='ri-refresh-line align-bottom me-1'></i>
            )}
            Yenile
          </Button>
          <Button
            type='button'
            className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
            onClick={() => navigate('/admin/task/list')}
          >
            <i className='ri-close-fill align-bottom'></i>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <TableViewBar>
          <TableView data={apiStates.apiData} loading={loading}></TableView>
        </TableViewBar>
      </CardBody>
    </Card>
  );
};

export default TaskSchedulerLogPage;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@hta/hooks/APIHooksOld'; // Adjust the import path as necessary
import { Table } from 'reactstrap';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe için

const RunLog = ({ formikValues }) => {
  const [state, actions] = useGetDataApi(
    'financial-management',
    'run-job-data',
    { data: [] },
    { calculation_id: formikValues.id },
    false,
    undefined,
    'GET',
  );

  const id = formikValues?.id;
  const { loading, apiData, error } = state;
  const { setQueryParams } = actions;

  const handleRefresh = () => {
    setQueryParams({ calculation_id: formikValues.id });
  };

  useEffect(() => {
    setQueryParams({ calculation_id: id });
  }, [id, setQueryParams]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleRefresh} disabled={!apiData?.canRunJob}>
        Refresh Data
      </button>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Durumu</th>
            <th>Kurulum saati</th>
            <th>Calısma saati</th>
            <th>Çalışma süresi</th>
          </tr>
        </thead>
        <tbody>
          {apiData &&
            apiData.data &&
            apiData.data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.status}</td>
                <td>
                  {format(new Date(item.job_scheduler_at), 'PPpp', {
                    locale: tr,
                  })}
                </td>
                <td>
                  {format(new Date(item.job_run_at), 'PPpp', { locale: tr })}
                </td>
                <td>{item.job_execution_time}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

RunLog.propTypes = {
  formikValues: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming `id` is a number
  }).isRequired,
};

export default RunLog;

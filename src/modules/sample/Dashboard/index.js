import React, { useEffect } from 'react';
import { useGetDataApi } from '@hta/hooks/APIHooks';

const Dashboard = () => {
  const controller = 'financial-management';
  const action = 'get-report-code-definition';
  const productId = 1;

  const [{ loading, apiData, error }, { setQueryParams }] = useGetDataApi(
    controller,
    action,
    undefined,
    { id: productId },
    false,
    null,
    'GET',
  );

  useEffect(() => {
    if (!apiData) {
      // Eğer API'dan henüz veri gelmediyse
      setQueryParams({ id: productId });
    }
  }, [productId]); // sadece productId değiştiğinde çalış

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {apiData && (
        <div>
          <p>Name: {apiData.name}</p>
          <p>Details: {apiData.details}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

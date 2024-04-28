import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    // URL'den sorgu parametrelerini parse edin
    let searchParams = new URLSearchParams(location.search);

    // router objesine query ekleyin
    return (
      <Component
        {...props}
        router={{
          location,
          navigate,
          params,
          query: Object.fromEntries(searchParams.entries()), // Sorgu parametrelerini objeye dönüştür
        }}
      />
    );
  }

  return ComponentWithRouterProp;
};

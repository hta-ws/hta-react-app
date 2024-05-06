import { useEffect, useRef, useState, useCallback } from 'react';
import _ from 'lodash';
import { isRequestSuccessful, sanitizeData } from '@hta/helpers/ApiHelper';
import jwtAxios from '@hta/services/auth/jwt-auth'; // Özelleştirilmiş jwtAxios instance'ını import edin

export const useGetDataApi = ({
  controller,
  action,
  initialData = null,
  params = {},
  initialCall = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callbackFun = () => {},
  method = 'GET',
}) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [initialUrl, setInitialUrl] = useState(
    `${baseUrl}/${controller}/${action}`,
  );
  const [allowApiCall, setAllowApiCall] = useState(initialCall);
  const [loading, setLoading] = useState(initialCall);
  const [apiData, setData] = useState(initialData);
  const [queryParams, updateQueryParams] = useState(params);
  const [error, setError] = useState(null);
  const cancelTokenSource = useRef(jwtAxios.CancelToken.source());

  const updateInitialUrl = (newController, newAction) => {
    const newUrl = `${baseUrl}/${newController}/${newAction}`;
    setInitialUrl(newUrl);
    setAllowApiCall(true);
  };

  // const setQueryParams = (newParams) => {
  //   setLoading(true);
  //   setError(null);
  //   updateQueryParams({ ...newParams });
  //   setAllowApiCall(true);
  // };
  const setQueryParams = useCallback((newParams) => {
    setLoading(true);
    setError(null);
    updateQueryParams({ ...newParams });
    setAllowApiCall(true);
  }, []); // No dependencies since the update logic does not rely on external variables

  // const submitData = (
  //   data,
  //   methodOverride = method,
  //   actionOverride = action,
  // ) => {
  //   setLoading(true);
  //   setError(null);
  //   const url = `${baseUrl}/${controller}/${actionOverride}`;
  //   const config = {
  //     method: methodOverride,
  //     url: url,
  //     data: sanitizeData(data),
  //     cancelToken: cancelTokenSource.current.token,
  //   };

  //   jwtAxios(config)
  //     .then((response) => {
  //       if (isRequestSuccessful(response.status)) {
  //         setData(response.data.result);
  //         callbackFun && callbackFun(response.data);
  //       } else {
  //         setError(
  //           response.data.error ? response.data.error : response.data.message,
  //         );
  //         setData(initialData);
  //       }
  //     })
  //     .catch((error) => {
  //       if (jwtAxios.isCancel(error)) {
  //         console.log('Request canceled', error.message);
  //       } else {
  //         const errorMessage = error.response?.data?.message || error.message;
  //         setError(errorMessage);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // };
  const submitData = (
    data,
    methodOverride = method, // Default to the 'method' defined in the hook setup
    actionOverride = action, // Default to the 'action' defined in the hook setup
    callback = callbackFun, // Default to the 'callbackFun' defined in the hook setup
  ) => {
    setLoading(true);
    setError(null);
    const url = `${baseUrl}/${controller}/${actionOverride}`;
    const config = {
      method: methodOverride,
      url: url,
      data: sanitizeData(data),
      cancelToken: cancelTokenSource.current.token,
    };

    jwtAxios(config)
      .then((response) => {
        if (isRequestSuccessful(response.status)) {
          //setData(response.data.items); // Update state with the new data
          if (callback) {
            callback(response.data); // Execute callback with the full response data
          }
        } else {
          setError(
            response.data.error ? response.data.error : response.data.message,
          );
          setData(initialData);
          if (callback) {
            callback(response.data); // Execute callback with the full response data
          } // Reset to initial data on error
        }
      })
      .catch((error) => {
        if (jwtAxios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message;
          setError(errorMessage);
          if (callback) {
            callback(error.response?.data); // Execute callback with the full response data
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (allowApiCall) {
      const fetchData = () => {
        cancelTokenSource.current.cancel(
          'Previous request cancelled because a new request is made.',
        );
        cancelTokenSource.current = jwtAxios.CancelToken.source();

        let config = {
          method,
          url: initialUrl,
          params: _.isEmpty(queryParams)
            ? {}
            : sanitizeData(trimObjectValues(queryParams)),
          cancelToken: cancelTokenSource.current.token,
        };

        if (method !== 'GET') {
          config.data = sanitizeData(queryParams);
          delete config.params;
        }

        jwtAxios(config)
          .then((response) => {
            if (isRequestSuccessful(response.status)) {
              setLoading(false);
              setData(response.data.items);
              callbackFun && callbackFun(response.data.items);
            } else {
              setLoading(false);
              setError(
                response.data.error
                  ? response.data.error
                  : response.data.message,
              );
              setData(initialData);
              callbackFun && callbackFun(response.data.items);
            }
          })
          .catch((error) => {
            if (jwtAxios.isCancel(error)) {
              console.log('Request canceled', error.message);
            } else {
              const errorMessage =
                error.response?.data?.message || error.message;
              setError(errorMessage);
              setLoading(false);
              callbackFun && callbackFun(error);
            }
          });
      };
      fetchData();
    }
    return () =>
      cancelTokenSource.current.cancel(
        'Component got unmounted or params changed.',
      );
  }, [initialUrl, queryParams, allowApiCall, method]);
  const updateApiData = useCallback(
    (updatedRow, actionType = 'update') => {
      let newData;
      if (actionType === 'update') {
        const exists = apiData.some((row) => row.id === updatedRow.id);
        if (exists) {
          newData = apiData.map((row) =>
            row.id === updatedRow.id ? { ...row, ...updatedRow } : row,
          );
        } else {
          newData = [...apiData, updatedRow];
        }
      } else if (actionType === 'remove') {
        newData = apiData.filter((row) => row.id !== updatedRow.id);
      }
      setData(newData);
    },
    [apiData],
  );
  const resetData = () => {
    setData(initialData);
  };
  return [
    { loading, apiData, error, initialUrl },
    {
      setData,
      setLoading,
      setError,
      updateInitialUrl,
      setQueryParams,
      submitData,
      updateApiData,
      resetData,
    },
  ];
};

export const trimObjectValues = (obj) => {
  if (_.isEmpty(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
};

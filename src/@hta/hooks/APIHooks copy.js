import { useEffect, useRef, useState, useCallback } from 'react';
import _ from 'lodash';
import { isRequestSuccessful, sanitizeData } from '@hta/helpers/ApiHelper';
import jwtAxios from '@hta/services/auth/jwt-auth';
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

  const updateInitialUrl = useCallback(
    (newController, newAction) => {
      const newUrl = `${baseUrl}/${newController}/${newAction}`;
      setInitialUrl(newUrl);
      setAllowApiCall(true);
    },
    [baseUrl],
  );

  const setQueryParams = useCallback((newParams) => {
    setLoading(true);
    setError(null);
    updateQueryParams({ ...newParams });
    setAllowApiCall(true);
  }, []);

  const submitData = useCallback(
    (data, methodOverride = method, actionOverride = action) => {
      setLoading(true);
      setError(null);
      const url = `${baseUrl}/${controller}/${actionOverride}`;
      const config = {
        method: methodOverride,
        url,
        data: sanitizeData(data),
        cancelToken: cancelTokenSource.current.token,
      };

      jwtAxios(config)
        .then((response) => {
          if (isRequestSuccessful(response.status)) {
            setData(response.data.items);
            if (callbackFun) {
              callbackFun(response.data);
            }
          } else {
            setError(
              response.data.error ? response.data.error : response.data.message,
            );
            setData(initialData);
            if (callbackFun) {
              callbackFun(response.data);
            }
          }
        })
        .catch((error) => {
          if (!jwtAxios.isCancel(error)) {
            setError(error.response?.data?.message || error.message);
            if (callbackFun) {
              callbackFun(error.response?.data);
            }
          }
        })
        .finally(() => setLoading(false));
    },
    [baseUrl, controller, action, method, callbackFun, initialData],
  );

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
            if (!jwtAxios.isCancel(error)) {
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
  }, [initialUrl, queryParams, allowApiCall, method, callbackFun]);

  return [
    { loading, apiData, error, initialUrl },
    {
      setData,
      setLoading,
      setError,
      updateInitialUrl,
      setQueryParams,
      submitData,
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

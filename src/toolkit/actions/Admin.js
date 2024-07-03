import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  GET_FS_TEMPLATE_LIST,
  SET_FS_TEMPLATE_ID,
  GET_FS_TYPE_LIST,
  SET_FS_TYPE,
  GET_FS_STOCK_LIST,
  SET_FS_STOCK,
} from 'shared/ActionTypes';

import jwtAxios from '@hta/services/auth/jwt-auth';

// Existing action
export const getFsTemplateList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .get('/definition/get-fs-template-list', { params })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_TEMPLATE_LIST,
            payload: response.data.items,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong',
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error?.message || 'Hata' });
      });
  };
};

// New action for fetching FS type list using POST
export const getFsTypeList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post('/definition/get-fs-type-list', params)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_TYPE_LIST,
            payload: response.data.items,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong',
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error?.message || 'Hata' });
      });
  };
};

// New action for fetching FS stock list using POST
export const getFsStockList = (fsTemplateId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post('/definition/get-stock-list', { fs_template_id: fsTemplateId })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_STOCK_LIST,
            payload: response.data.items,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something went wrong',
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error?.message || 'Hata' });
      });
  };
};

// New action for setting FS stock
export const setFsStock = (stock) => ({
  type: SET_FS_STOCK,
  payload: stock,
});

export const setFsType = (fsType) => ({
  type: SET_FS_TYPE,
  payload: fsType,
});

export const setFsTemplateId = (id) => ({
  type: SET_FS_TEMPLATE_ID,
  payload: id,
});

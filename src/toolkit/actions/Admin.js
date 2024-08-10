// actions.js veya toolkit/actions.js

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
  GET_FS_SP_METADATA_LIST,
  GET_FS_REPORT_CODE_LIST,
  GET_FS_PROCEDURE_LIST, // Updated action type
} from 'shared/ActionTypes';

import jwtAxios from '@hta/services/auth/jwt-auth';
import { selectFsTemplateId } from 'toolkit/selectors';

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
export const getFsStockList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const fsTemplateId = selectFsTemplateId(state);

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

// New action for fetching FS SP metadata list
export const getFsSpMetadataList = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .get('/formula-definition/get-fs-sp-metadata-list')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_SP_METADATA_LIST,
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

// New action for fetching FS report code list using POST
export const getFsReportCodeList = (params = {}) => {
  return (dispatch, getState) => {
    const state = getState();
    const fsTemplateId = selectFsTemplateId(state);

    const paramsWithFormatId = {
      ...params,
      fs_template_id: fsTemplateId,
    };

    dispatch({ type: FETCH_START });
    jwtAxios
      .post('/formula-definition/get-report-code-list', paramsWithFormatId)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_REPORT_CODE_LIST,
            payload: response.data.items,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something Went Wrong',
          });
        }
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error?.message || 'Hata' });
      });
  };
};

// New action for fetching FS procedure list
export const getFsProcedureList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post('/formula-definition/get-fs-procedure-list', params)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FS_PROCEDURE_LIST,
            payload: response.data.items,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: 'Something Went Wrong',
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

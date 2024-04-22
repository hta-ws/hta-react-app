import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  //   HIDE_MESSAGE,
  //   SHOW_MESSAGE,
  //   TOGGLE_APP_DRAWER,
  //   UPDATING_CONTENT,
  GET_FINANCIAL_STATEMENT_FORMAT_LIST,
  GET_FINANCIAL_STATEMENT_TYPE_LIST,
  GET_FINANCIAL_STATEMENT_PROCEDURE_LIST,
  SET_FINANCIAL_STATEMENT_FORMAT,
  SET_FINANCIAL_STATEMENT_TYPE,
  SET_FINANCIAL_STATEMENT_PROCEDURE,
  SET_FINANCIAL_STATEMENT_CURRENT_POPULATION_RECORD,
  GET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE_LIST,
  SET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE,
} from 'shared/ActionTypes';

import jwtAxios from '@hta/services/auth/jwt-auth';
// import { appIntl } from '@hta/helpers/Common';

export const getFinancialStatementFormatList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post(
        `/financial-statement-management/get-financial-statement-format-list`,
        params,
      )
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FINANCIAL_STATEMENT_FORMAT_LIST,
            payload: data.data.items,
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

export const getFinancialStatementTypeList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post(
        `/financial-statement-management/get-financial-statement-type-list`,
        params,
      )
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FINANCIAL_STATEMENT_TYPE_LIST,
            payload: data.data.items,
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

export const get_financial_statement_procedure_list = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post(
        `/financial-statement-management/get-financial-statement-procedure-list`,
        params,
      )
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FINANCIAL_STATEMENT_PROCEDURE_LIST,
            payload: data.data.items,
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

export const getFinancialStatementSampleStockCodeList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAxios
      .post(
        `/financial-statement-management/get-financial-statement-sample-stock-code-list`,
        params,
      )
      .then((data) => {
        if (data.status === 200) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: GET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE_LIST,
            payload: data.data.items,
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

export const setFinancialStatementFormatCode = (item) => {
  return (dispatch) =>
    dispatch({ type: SET_FINANCIAL_STATEMENT_FORMAT, payload: item });
};

export const setFinancialStatementTypeCode = (item) => {
  return (dispatch) =>
    dispatch({ type: SET_FINANCIAL_STATEMENT_TYPE, payload: item });
};
export const setFinancialStatementSampleStockCode = (item) => {
  return (dispatch) =>
    dispatch({
      type: SET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE,
      payload: item,
    });
};

export const set_financial_statement_procedure = (item) => {
  return (dispatch) =>
    dispatch({ type: SET_FINANCIAL_STATEMENT_PROCEDURE, payload: item });
};

export const setCurrentPopulationRecord = (item) => {
  return (dispatch) =>
    dispatch({
      type: SET_FINANCIAL_STATEMENT_CURRENT_POPULATION_RECORD,
      payload: item,
    });
};

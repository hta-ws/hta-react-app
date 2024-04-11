import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
  UPDATING_CONTENT,
} from 'shared/ActionTypes';

// import jwtAxios from '@hta/services/auth/jwt-auth';
// import { appIntl } from '@hta/helpers/Common';

export const fetchStart = () => {
  return (dispatch) => dispatch({ type: FETCH_START });
};

export const fetchSuccess = () => {
  return (dispatch) => dispatch({ type: FETCH_SUCCESS });
};
export const updatingContent = () => {
  return (dispatch) => dispatch({ type: UPDATING_CONTENT });
};

export const fetchError = (error) => {
  // Hata mesajını konsola yazdır
  console.log('Fetching Error:', error);
  return (dispatch) => {
    console.log('dispatch fetchError action');
    dispatch({ type: FETCH_ERROR, payload: error });
    // Dispatch fonksiyonu çağrıldıktan sonra konsola bilgi yazdır
  };
};
export const showMessage = (message) => {
  return (dispatch) => dispatch({ type: SHOW_MESSAGE, payload: message });
};
export const onToggleAppDrawer = () => {
  return (dispatch) => dispatch({ type: TOGGLE_APP_DRAWER });
};

export const hideMessage = () => {
  return (dispatch) => dispatch({ type: HIDE_MESSAGE });
};

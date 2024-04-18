import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const jwtAxios = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

jwtAxios.CancelToken = axios.CancelToken;
jwtAxios.isCancel = axios.isCancel; // Bu satırı ekleyin

jwtAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(error);
  },
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;

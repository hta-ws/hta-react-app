import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtAxios, { setAuthToken } from './index';
import { useDispatch } from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  // SET_USER,
} from 'shared/ActionTypes';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [authData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const getAuthUser = () => {
      dispatch({ type: FETCH_START });
      const token = localStorage.getItem('token');

      if (!token) {
        dispatch({ type: FETCH_SUCCESS });
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/auth')
        .then(({ data }) => {
          dispatch({ type: FETCH_SUCCESS });
          // dispatch({ type: SET_USER, payload: data.result.user });
          setJWTAuthData({
            user: data.result.user,
            isLoading: false,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          });
          dispatch({ type: FETCH_SUCCESS });
        });
    };

    getAuthUser();
  }, [dispatch]);

  const signInUser = async ({ username, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post('auth', { username, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.message || 'Something went wrong',
      });
      // fetchError(error?.response?.data?.error || 'Something went wrong');
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post('users', { name, email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...authData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};

import React from 'react';
import AppMessageView from '../AppMessageView';
import AppLoader from '../AppLoader';
import { HIDE_MESSAGE } from 'shared/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';

const AppInfoView = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  const dispatch = useDispatch();

  const clearInfoView = () => {
    dispatch({ type: HIDE_MESSAGE });
  };

  // Eğer mesaj varsa, mesajı gösteren bir fonksiyon
  const showMessage = () => (
    <AppMessageView
      variant={error && message ? 'error' : 'success'}
      message={message.toString()}
      clearInfoView={clearInfoView}
    />
  );

  // Eğer hata var ve mesaj yoksa, hatayı gösteren bir fonksiyon
  const showError = () => (
    <AppMessageView
      variant='error'
      message={error.toString()}
      clearInfoView={clearInfoView}
    />
  );

  return (
    <>
      {loading && <AppLoader />}
      {message ? showMessage() : error ? showError() : null}
      {/* Yukarıdaki satırda önce message'ın varlığı kontrol ediliyor, 
          eğer yoksa error kontrol ediliyor. */}
    </>
  );
};

export default AppInfoView;

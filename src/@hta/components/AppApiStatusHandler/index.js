import React from 'react';
import { Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import './loader.css';
const AppApiStatusHandler = ({ loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className='app-loader'>
        <div className='loader-spin'>
          <span className='veo-dot veo-dot-spin'>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert color='danger'>
        <h4 className='alert-heading'>Hata alindi...!</h4>
        <p>{error}</p>
        <Button color='primary' onClick={onRetry}>
          Yeniden dene
        </Button>
      </Alert>
    );
  }

  return null;
};

AppApiStatusHandler.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default AppApiStatusHandler;

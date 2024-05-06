import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const AppAlert = ({ strongMessage, message, color }) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  // Function to render detailed error messages if message is an object
  const renderErrors = () => {
    if (typeof message === 'object' && message !== null) {
      return Object.entries(message).map(([field, messages], index) => (
        <div key={index}>
          <strong>
            {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}:
          </strong>
          {messages.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      ));
    }
    // Default rendering for simple message
    return message;
  };

  return (
    <Alert color={color} isOpen={visible} toggle={onDismiss}>
      {color === 'danger' && (
        <i className='ri-alert-line me-3 align-middle fs-16'></i>
      )}
      {strongMessage && <strong>{strongMessage}</strong>}
      {strongMessage && ' - '}
      {renderErrors()}
    </Alert>
  );
};

// Prop validation
AppAlert.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  ]).isRequired, // Ensures 'message' can be either a string or a structured error object
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]).isRequired, // Ensures 'color' is one of specific values and required
  strongMessage: PropTypes.string, // 'strongMessage' is optional
};

export default AppAlert;

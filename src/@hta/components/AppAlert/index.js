import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const AppAlert = ({ strongMessage, message, color }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={color} isOpen={visible} toggle={onDismiss}>
      {/* Only display the <strong> element if strongMessage is provided */}
      {color === 'danger' && (
        <i className='ri-alert-line me-3 align-middle fs-16'></i>
      )}
      {strongMessage && <strong>{strongMessage}</strong>}
      {/* Conditionally add a dash only if strongMessage exists */}
      {strongMessage && ' - '}
      {message}
    </Alert>
  );
};

// Prop validation
AppAlert.propTypes = {
  message: PropTypes.string.isRequired, // Ensures 'message' is a string and required
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

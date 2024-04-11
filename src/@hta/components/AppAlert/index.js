import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types'; // PropTypes'ı içe aktarın

const AppAlert = ({ message, color }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={color} isOpen={visible} toggle={onDismiss}>
      {message}
    </Alert>
  );
};

// Prop validation ekleyin
AppAlert.propTypes = {
  message: PropTypes.string.isRequired, // message prop'unun bir string ve gerekli olduğunu belirtin
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]).isRequired, // color prop'unun belirli string değerlerinden biri ve gerekli olduğunu belirtin
};

export default AppAlert;

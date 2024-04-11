import React from 'react';
import JWTAuthAuthProvider from '@hta/services/auth/jwt-auth/JWTAuthProvider';
import PropTypes from 'prop-types';

const AppAuthProvider = ({ children }) => {
  return <JWTAuthAuthProvider>{children}</JWTAuthAuthProvider>;
};

AppAuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AppAuthProvider;

import React from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthWrapper = ({ children }) => {
  return (
    <div className='auth-one-bg-position auth-one-bg' id='auth-particles'>
      <div className='bg-overlay'></div>

      <div className='shape'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 1440 120'
        >
          <path d='M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z'></path>
        </svg>
      </div>

      {children}
    </div>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

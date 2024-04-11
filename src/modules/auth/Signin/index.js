// import React from 'react';
// import Box from '@mui/material/Box';
import { Container, Row, Col } from 'reactstrap';
import AuthWrapper from '../AuthWrapper';
import { Link } from 'react-router-dom';
import logoLight from '../../../assets/images/logo/logo-light.png';
// import SigninFirebase from './SigninFirebase';
// import AppLogo from '@crema/components/AppLayout/components/AppLogo';
import defaultConfig from 'shared/defaultConfig';

import AppMetaTags from '@hta/components/AppMetaTags';
import SigninJwtAuth from './SigninJwtAuth';
import AppInfoView from '@hta/components/AppInfoView';
//import IntlMessages from '@veo/helpers/IntlMessages';

// import AppInfoView from '@veo/components/AppInfoView';

const Signin = () => {
  // const { messages } = useIntl();
  return (
    <AuthWrapper>
      <AppMetaTags title='Login Page' />
      <Container>
        <Row>
          <Col lg={12}>
            <div className='text-center mt-sm-5 mb-4 text-white-50'>
              <div>
                <Link to='/' className='d-inline-block auth-logo'>
                  <img src={logoLight} alt='' height='50' />
                </Link>
              </div>
              <p className='mt-3 fs-15 fw-medium'>
                {defaultConfig.description
                  ? defaultConfig.description.toUpperCase()
                  : ''}
              </p>
            </div>
          </Col>
        </Row>
        <SigninJwtAuth />
        {/* <div className='mt-4 text-center'>
          <p className='mb-0'>
            <IntlMessages id='common.doneHaveAccount' />
            <a
              className='fw-semibold text-primary text-decoration-underline'
              href='/velzon/react/master/register'
            >
              <IntlMessages id='common.signup' />
            </a>
          </p>
        </div> */}
      </Container>
      <AppInfoView />
    </AuthWrapper>
  );
};

export default Signin;

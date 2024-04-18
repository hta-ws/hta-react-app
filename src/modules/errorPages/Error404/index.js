import React from 'react';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { grey } from '@mui/material/colors';
// import { Fonts } from '@crema/constants/AppEnums';
// import { initialUrl } from '@crema/constants/AppConst';
// import IntlMessages from '@crema/helpers/IntlMessages';
// import { ReactComponent as Logo } from '../../../assets/icon/404.svg';
// import { useTheme } from '@mui/material';
import AppAnimate from '@hta/components/AppAnimate';
import IntlMessages from '@hta/helpers/IntlMessages';

import { initialUrl } from 'shared/AppConst';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import error400cover from '../../../assets/images/error400-cover.png';

const Error404 = () => {
  document.title =
    '404 Error Cover | Velzon - React Admin & Dashboard Template';
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <div className='auth-page-wrapper d-flex justify-content-center align-items-center'>
        <div className='auth-page-content overflow-hidden p-0'>
          <Container>
            <Row className='justify-content-center'>
              <Col xl={7} lg={8}>
                <div className='text-center'>
                  <img
                    src={error400cover}
                    alt='error img'
                    className='img-fluid'
                  />
                  <div className='mt-3'>
                    <h3 className='text-uppercase'>
                      <IntlMessages id='common.sorryPageNotFound' />
                    </h3>
                    <p className='text-muted mb-4'>
                      The page you are looking for not available!
                    </p>
                    <Link to={initialUrl} className='btn btn-success'>
                      <i className='mdi mdi-home me-1'></i>Back to home
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </AppAnimate>
  );
};

export default Error404;

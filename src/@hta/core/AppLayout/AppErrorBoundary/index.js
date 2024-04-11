import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import ErrorIcon from './ErrorIcon'; // Assume this is a custom component

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Handle the error state
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error info
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          className='text-center d-flex align-items-center justify-content-center flex-column'
          style={{ flex: 1 }}
        >
          <ErrorIcon />
          <h2 className='mt-3' style={{ fontSize: '1.875rem' }}>
            {/* Ah! Bir şeyler ters gitti.. */}
            Ah! Bir şeyler ters gitti.
          </h2>
          <p className='mt-2' style={{ fontSize: '1.125rem' }}>
            {/* Brace yourself till we get the error fixed. */}
            Hatayı düzeltene kadar sabırlı olun.
          </p>
          {/* <p>You may also refresh the page or try again latter</p> */}
          <p>
            Sayfayı da yenileyebilir ya da daha sonra tekrar deneyebilirsiniz.
          </p>
          <Button
            color='primary'
            className='mt-3'
            onClick={() => this.setState({ hasError: false })}
          >
            Tekrar deneyin
          </Button>
        </Container>
      );
    } else {
      return this.props.children;
    }
  }
}

export default AppErrorBoundary;

AppErrorBoundary.propTypes = {
  children: PropTypes.node,
};

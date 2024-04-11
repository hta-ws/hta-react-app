import React from 'react';
// import AppFooter from '../AppFooter';
import AppErrorBoundary from '../AppErrorBoundary';
import PropTypes from 'prop-types';
import AppContentViewWrapper from './AppContentViewWrapper';
import AppSuspense from '@hta/components/AppSuspense';

const AppContentView = ({ routes, ...rest }) => {
  return (
    <AppContentViewWrapper {...rest}>
      <AppSuspense>
        <AppErrorBoundary>{routes}</AppErrorBoundary>
      </AppSuspense>
      {/* <AppFooter /> */}
    </AppContentViewWrapper>
  );
};
export default AppContentView;

AppContentView.propTypes = {
  routes: PropTypes.object.isRequired,
  layout: PropTypes.string,
};

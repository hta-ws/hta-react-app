import React from 'react';
import PropTypes from 'prop-types';

import LocaleContextProvider from './LocaleContextProvider';
import LayoutContextProvider from './LayoutContextProvider';
import SidebarContextProvider from './SidebarContextProvider';

const AppContextProvider = ({ children }) => {
  return (
    <LocaleContextProvider>
      <LayoutContextProvider>
        <SidebarContextProvider>{children}</SidebarContextProvider>
      </LayoutContextProvider>
    </LocaleContextProvider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React, { createContext, useContext, useState } from 'react';
import defaultConfig from 'shared/defaultConfig';
import PropTypes from 'prop-types';

// import { LayoutDirection } from '@veo/constants/AppEnums';

const LocaleContext = createContext();
const LocaleActionsContext = createContext();

export const useLocaleContext = () => useContext(LocaleContext);

export const useLocaleActionsContext = () => useContext(LocaleActionsContext);

const LocaleContextProvider = ({ children }) => {
  const [locale] = useState(defaultConfig.locale);
  // const { theme } = useThemeContext();
  // const { updateTheme } = useThemeActionsContext();

  return (
    <LocaleContext.Provider
      value={{
        locale,
        rtlLocale: defaultConfig.rtlLocale,
      }}
    >
      {/* <LocaleActionsContext.Provider
        value={{
          updateLocale,
        }}
      > */}
      {children}
      {/* </LocaleActionsContext.Provider> */}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;

LocaleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

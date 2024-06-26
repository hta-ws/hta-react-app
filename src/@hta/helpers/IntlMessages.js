import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { allowMultiLanguage } from 'shared/AppConst';
import PropTypes from 'prop-types';

const InjectMassage = (props) => {
  if (allowMultiLanguage) {
    return <FormattedMessage {...props} />;
  } else {
    return props.id.split('.').pop();
  }
};

InjectMassage.propTypes = {
  id: PropTypes.string,
};

export default injectIntl(InjectMassage, {
  forwardRef: false,
});

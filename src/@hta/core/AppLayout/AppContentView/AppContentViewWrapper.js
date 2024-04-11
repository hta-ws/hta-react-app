import React from 'react';
import PropTypes from 'prop-types';

const AppContentViewWrapper = ({ children, layout, ...rest }) => {
  if (layout === 'protected') {
    return (
      <div {...rest}>
        <div className='page-content'>{children}</div>
      </div>
    );
  }

  return <div {...rest}>{children}</div>;
};

export default AppContentViewWrapper;

AppContentViewWrapper.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.string, // Add prop type for layout
};

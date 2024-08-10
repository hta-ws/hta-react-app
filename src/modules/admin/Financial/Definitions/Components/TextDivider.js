import React from 'react';
import PropTypes from 'prop-types';

const TextDivider = ({ text }) => {
  return (
    <div className='d-flex align-items-center my-2 text-gray-600'>
      <div
        className='flex-grow-1'
        style={{ height: '2px', backgroundColor: 'gray' }}
      ></div>
      <span className='mx-2 fs-6 fw-medium'>{text}</span>
      <div
        className='flex-grow-1'
        style={{ height: '2px', backgroundColor: 'gray' }}
      ></div>
    </div>
  );
};

TextDivider.propTypes = {
  text: PropTypes.string,
};

export default TextDivider;

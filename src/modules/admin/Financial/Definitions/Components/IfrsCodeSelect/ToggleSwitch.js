import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ isChecked, onChange, label }) => (
  <div className='form-check form-switch form-switch-right form-switch-md align-self-center'>
    <label className='form-label text-muted'>{label}</label>
    <input
      className='form-check-input code-switcher'
      type='checkbox'
      checked={isChecked}
      onChange={onChange}
    />
  </div>
);

ToggleSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired, // Ensures isChecked is a boolean and required
  onChange: PropTypes.func.isRequired, // Ensures onChange is a function and required
  label: PropTypes.string.isRequired, // Ensures label is a string and required
};

export default ToggleSwitch;

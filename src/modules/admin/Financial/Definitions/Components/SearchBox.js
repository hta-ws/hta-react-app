import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

export const SearchBox = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className='search-box position-relative'>
      <Input
        type='text'
        value={value}
        onChange={handleChange}
        className='form-control'
        placeholder={placeholder}
      />
      {value && (
        <button
          type='button'
          className='btn-close position-absolute top-50 end-0 translate-middle-y me-2'
          aria-label='Arama metnini temizle'
          onClick={handleClear}
        ></button>
      )}
      <i className='ri-search-line search-icon position-absolute top-50 start-0 translate-middle-y ms-3'></i>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBox.defaultProps = {
  placeholder: 'Arama kriterini giriniz....',
};

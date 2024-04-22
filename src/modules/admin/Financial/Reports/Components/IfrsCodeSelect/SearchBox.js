import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const SearchBox = ({ value, onChange }) => {
  // İçerik temizleme fonksiyonu

  const handleChange = (e) => {
    // Input'tan gelen event'i kullanarak değeri al ve onChange prop'una gönder
    onChange(e.target.value);
  };
  const handleClear = () => {
    // Arama kutusunu temizlemek için boş bir string ile onChange fonksiyonunu çağır
    onChange('');
  };

  return (
    <div className='search-box position-relative'>
      <Input
        type='text'
        value={value}
        onChange={handleChange}
        className='form-control'
        placeholder='Arama yapın...'
      />
      {value && (
        <button
          type='button'
          className='btn-close position-absolute top-50 end-0 translate-middle-y me-2'
          aria-label='Clear'
          onClick={handleClear} // handleClear fonksiyonunu kullan
        ></button>
      )}
      <i className='ri-search-line search-icon position-absolute top-50 start-0 translate-middle-y ms-3'></i>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;

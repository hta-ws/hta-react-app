import React from 'react';
import PropTypes from 'prop-types';

const AppFormatter = ({ value, format, Tag, className }) => {
  if (format && format.type === 'string') {
    return <Tag className={className}>{value}</Tag>;
  }
  let numericValue = parseFloat(value);
  let formattedValue = !isNaN(numericValue) ? numericValue : 0;

  let prefixComponent = null;
  let suffixComponent = null;
  if (value == 'N/A') return value;
  if (format && format.type === 'number') {
    const numberFormat = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: format.decimal !== undefined ? format.decimal : 0,
      maximumFractionDigits: format.decimal !== undefined ? format.decimal : 0,
    });
    formattedValue = numberFormat.format(formattedValue);

    if (format.negativeValue && numericValue < 0) {
      formattedValue = format.negativeValue;
    } else {
      if (format.prefix) {
        prefixComponent = (
          <span className='me-1 text-muted'>{format.prefix}</span>
        );
      }
      if (format.suffix) {
        suffixComponent = (
          <span className='ms-1 text-muted'>{format.suffix}</span>
        );
      }
    }
  }

  const style = {};
  if (format && format.colored) {
    style.color = numericValue > 0 ? '#42be65' : 'red';
  }
  if (format && format.negativeRed && numericValue < 0) {
    style.color = 'red';
  }

  // reverseColor özelliğini kontrol et ve true ise renkleri değiştir
  if (format && format.reverseColor) {
    style.color = numericValue > 0 ? 'red' : '#42be65'; // Pozitif değerler için kırmızı, negatif değerler için yeşil
  }

  // Tag varsa içerik Tag içinde, yoksa doğrudan içerik render edilir.
  const content = (
    <>
      {prefixComponent}
      {formattedValue}
      {suffixComponent}
    </>
  );

  return Tag ? (
    <Tag className={className} style={style}>
      {content}
    </Tag>
  ) : (
    <>{content}</>
  );
};

// PropType tanımlamaları
AppFormatter.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  format: PropTypes.shape({
    type: PropTypes.string,
    decimal: PropTypes.number,
    colored: PropTypes.bool,
    hideNegative: PropTypes.bool,
    negativeValue: PropTypes.string,
    suffix: PropTypes.string,
    prefix: PropTypes.string,
    negativeRed: PropTypes.bool,
    reverseColor: PropTypes.bool, // reverseColor prop'u eklendi
  }),
  Tag: PropTypes.elementType,
  className: PropTypes.string,
};

// Varsayılan prop değerleri
AppFormatter.defaultProps = {
  value: 0,
  format: null,
  Tag: null,
  className: '',
};

export default AppFormatter;

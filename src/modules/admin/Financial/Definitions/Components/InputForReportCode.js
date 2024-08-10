import React from 'react';
import PropTypes from 'prop-types';
import slugify from 'react-slugify';
const InputForReportCode = ({
  field,
  form: { touched, errors, setFieldValue, values },
  label,
  buttonText,
  ...props
}) => {
  const handleButtonClick = () => {
    const sLabelValue = slugify(values.s_label, { delimiter: '_' });
    setFieldValue(field.name, sLabelValue);
  };

  // Eğer field.value undefined ise boş string kullanarak kontrol edilmiş bir girdi sağla
  const controlledFieldProps = {
    ...field,
    value: field.value || '',
  };

  return (
    <div className='mb-1'>
      <label htmlFor={props.id || field.name}>{label}</label>
      <div className='input-group'>
        <input className='form-control' {...controlledFieldProps} {...props} />
        <button
          className='btn btn-outline-secondary'
          type='button'
          onClick={handleButtonClick}
        >
          <i className='ri-file-copy-line search-icon align-bottom me-1'></i>
          {buttonText}
        </button>
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className='text-danger'>{errors[field.name]}</div>
      )}
    </div>
  );
};

InputForReportCode.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired, // Formik formunun tüm değerlerine erişim sağlamak için ekledik
  }).isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  buttonText: PropTypes.string, // Buton metni
};

InputForReportCode.defaultProps = {
  type: 'text',
  label: '',
  buttonText: 'Açıklamadan al', // Varsayılan buton metni
};

export default InputForReportCode;

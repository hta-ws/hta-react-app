import React from 'react';
import PropTypes from 'prop-types';

const FormikInput = ({ field, form: { touched, errors }, label, ...props }) => {
  return (
    <div className='mb-1'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='form-control' {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className='text-danger'>{errors[field.name]}</div>
      )}
    </div>
  );
};

FormikInput.propTypes = {
  // `field` object contains `name`, `value`, `onChange`, and `onBlur`
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  // `form` object contains Formik bag with `touched`, `errors` and more
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  // Additional props for input customization
  label: PropTypes.string, // Label text for the input
  id: PropTypes.string, // ID for the input, if not provided, `name` will be used
  type: PropTypes.string,
  name: PropTypes.string, // Input type e.g., text, number, email, etc.
};

FormikInput.defaultProps = {
  type: 'text', // Default input type is text
  label: '', // Default label is empty string
};

export default FormikInput;

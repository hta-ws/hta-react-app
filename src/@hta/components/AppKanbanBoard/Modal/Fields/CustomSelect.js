import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';

const CustomSelect = ({ field, form, options }) => {
  const defaultValue = options.find((option) => option.value === 'd');

  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption.value);
  };

  return (
    <FormGroup>
      <Select
        id={field.name}
        name={field.name}
        value={
          options.find((option) => option.value === field.value) || defaultValue
        }
        onChange={handleChange}
        options={options}
        classNamePrefix='react-select'
      />
    </FormGroup>
  );
};

CustomSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CustomSelect;

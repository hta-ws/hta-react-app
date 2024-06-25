import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import get from 'lodash/get';

function SelectField(props) {
  const defaultValue = props.options.find((option) => option.value === 'd');

  const handleChange = (selectedOption) => {
    props.setFieldValue(props.name, selectedOption ? selectedOption.value : '');
  };

  return (
    <FormGroup>
      {props.label && <Label for={props.name}>{props.label}</Label>}
      <Select
        id={props.name}
        name={props.name}
        value={
          props.options.find((option) => option.value === props.value) ||
          defaultValue
        }
        onChange={handleChange}
        options={props.options}
        onBlur={props.handleBlur}
        classNamePrefix='react-select'
      />
      {props.error && get(props.touched, props.name) && (
        <FormFeedback className='d-block'>{props.error}</FormFeedback>
      )}
    </FormGroup>
  );
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  error: PropTypes.any,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default SelectField;

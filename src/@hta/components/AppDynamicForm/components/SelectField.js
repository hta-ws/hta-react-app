import React from 'react';
import PropTypes from 'prop-types';
import { FieldContainer, Select, Label } from './_fieldStyles';

function SelectField(props) {
  return (
    <FieldContainer>
      <Label>{props.label}</Label>
      <Select
        name={props.name}
        defaultValue={props.value}
        onBlur={props.handleBlur}
        onChange={props.onChange}
      >
        <option value={''}>Please Select</option>
        {props.options.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {opt}
            </option>
          );
        })}
      </Select>
      {props.error && props.touched[props.name] && (
        <div className='error'>{props.error}</div>
      )}
    </FieldContainer>
  );
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  touched: PropTypes.any,
};

SelectField.defaultValue = {
  options: [],
};

export default SelectField;

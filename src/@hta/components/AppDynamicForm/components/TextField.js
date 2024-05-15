import React from 'react';
import PropTypes from 'prop-types';
import { FieldContainer, Input, Label } from './_fieldStyles';

function TextField(props) {
  return (
    <FieldContainer>
      <Label className='label'>{props.label}</Label>
      <Input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.handleBlur}
        onChange={props.onChange}
      />
      {props.error && props.touched[props.name] && (
        <div className='error'>{props.error}</div>
      )}
    </FieldContainer>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  touched: PropTypes.any,
  type: PropTypes.string,
};

export default TextField;

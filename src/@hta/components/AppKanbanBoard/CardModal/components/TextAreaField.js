import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function TextAreaField(props) {
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <Input
        type='textarea'
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onBlur={props.handleBlur}
        onChange={props.onChange}
        invalid={!!props.error && !!props.touched[props.name]}
      />
      {props.error && props.touched[props.name] && (
        <FormFeedback>{props.error}</FormFeedback>
      )}
    </FormGroup>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

TextAreaField.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  error: '',
};

export default TextAreaField;

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function RadioButtonField(props) {
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      {props.options.map((opt, index) => {
        return (
          <FormGroup check key={index}>
            <Label check>
              <Input
                type='radio'
                name={props.name}
                value={opt}
                checked={opt === props.value}
                onBlur={props.handleBlur}
                onChange={props.onChange}
                invalid={!!props.error && !!props.touched[props.name]}
              />
              {opt}
            </Label>
          </FormGroup>
        );
      })}
      {props.error && props.touched[props.name] && (
        <FormFeedback>{props.error}</FormFeedback>
      )}
    </FormGroup>
  );
}

RadioButtonField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.array.isRequired,
  error: PropTypes.any,
  touched: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default RadioButtonField;

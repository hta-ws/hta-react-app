import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import get from 'lodash/get';

function TextField(props) {
  return (
    <FormGroup>
      {props.label && <Label for={props.name}>{props.label}</Label>}
      <Input
        type={props.type || 'text'}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.handleBlur}
        onChange={props.onChange}
        invalid={!!props.error && !!get(props.touched, props.name)}
      />
      {props.error && get(props.touched, props.name) && (
        <FormFeedback>{props.error}</FormFeedback>
      )}
    </FormGroup>
  );
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function UploadField(props) {
  return (
    <FormGroup>
      {props.label && <Label for={props.name}>{props.label}</Label>}
      <Input
        type='file'
        id={props.name}
        name={props.name}
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

UploadField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
};

UploadField.defaultProps = {};

export default UploadField;

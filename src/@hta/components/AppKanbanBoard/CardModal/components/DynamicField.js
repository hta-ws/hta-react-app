import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextField from './TextField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import RadioButtonField from './RadioButtonField';
import CheckboxField from './CheckboxField';
import UploadField from './UploadField';
import ReportCodeSelect from './ReportCodeSelect';
import NumberField from './NumberField';

const fieldMap = {
  text: TextField,
  select: SelectField,
  textarea: TextAreaField,
  radio: RadioButtonField,
  checkbox: CheckboxField,
  upload: UploadField,
  reportCodeSelect: ReportCodeSelect,
  number: NumberField,
};

function DynamicField({ field, formikProps }) {
  const { errors, touched, values, handleBlur, handleChange, setFieldValue } =
    formikProps;

  if (!field || !field.type) {
    console.error('Invalid field configuration: ', field);
    return null;
  }

  const Component = fieldMap[field.type];

  if (!Component) {
    console.error('Unsupported field type: ', field.type);
    return null;
  }

  const error = get(errors, field.name);
  const fieldProps = {
    ...field,
    value: get(values, field.name, ''),
    touched: touched,
    error: error,
    handleBlur: handleBlur,
    onChange: handleChange,
    setFieldValue: setFieldValue,
    form: formikProps,
  };

  return <Component {...fieldProps} />;
}

DynamicField.propTypes = {
  field: PropTypes.object.isRequired,
  formikProps: PropTypes.object.isRequired,
};

export default DynamicField;

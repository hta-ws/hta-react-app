import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import ReportCodeSelect from './Fields/ReportCodeSelect';

const GroupedFields = ({ group, values, setFieldValue }) => {
  const getFieldValue = (name) => {
    const keys = name.split('.');
    return keys.reduce((value, key) => {
      return value && value[key] !== undefined ? value[key] : '';
    }, values);
  };

  const handleFieldChange = (fieldItem, e) => {
    const value = e.target.value;
    setFieldValue(fieldItem.name, value);

    // Burada diğer field'ların değerlerini değiştirmek için gerekli kodu ekleyin
    if (fieldItem.onChangeField) {
      const { targetField, action } = fieldItem.onChangeField;
      if (action === 'setLabelWithSelectedValue') {
        setFieldValue(targetField, `${value}`);
      }
    }
  };

  const renderField = (fieldItem) => {
    if (fieldItem.type === 'reportCodeSelect') {
      return (
        <Field name={fieldItem.name}>
          {({ field, form }) => (
            <ReportCodeSelect
              field={field}
              form={form}
              onChangeField={fieldItem.onChangeField}
            />
          )}
        </Field>
      );
    }
    return (
      <Field
        name={fieldItem.name}
        type={fieldItem.type}
        as={Input}
        id={fieldItem.name}
        value={getFieldValue(fieldItem.name)}
        onChange={(e) => handleFieldChange(fieldItem, e)}
      />
    );
  };

  return (
    <fieldset className='border p-2 mb-2'>
      <legend className='w-auto'>{group.title}</legend>
      {group.rows.map((row, rowIndex) => {
        const colSize = 12 / row.length; // Adjust column size based on the number of fields per row
        return (
          <div key={rowIndex} className='row'>
            {row.map((fieldItem, fieldIndex) => (
              <div key={fieldIndex} className={`col-md-${colSize}`}>
                <FormGroup>
                  <Label for={fieldItem.name}>{fieldItem.label}</Label>
                  {renderField(fieldItem)}
                  <ErrorMessage
                    name={fieldItem.name}
                    component='div'
                    className='text-danger'
                  />
                </FormGroup>
              </div>
            ))}
          </div>
        );
      })}
    </fieldset>
  );
};

export default GroupedFields;

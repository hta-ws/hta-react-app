import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

const GroupedFields = ({ group, values, setFieldValue }) => {
  const getFieldValue = (name) => {
    const keys = name.split('.');
    return keys.reduce((value, key) => {
      return value && value[key] !== undefined ? value[key] : '';
    }, values);
  };

  return (
    <fieldset className='border p-2 mb-2'>
      <legend className='w-auto'>{group.title}</legend>
      {group.rows.map((row, rowIndex) => {
        const colSize = 12 / row.length; // Adjust column size based on the number of fields per row
        return (
          <div key={rowIndex} className='row'>
            {row.map((field, fieldIndex) => (
              <div key={fieldIndex} className={`col-md-${colSize}`}>
                <FormGroup>
                  <Label for={field.name}>{field.label}</Label>
                  <Field
                    name={field.name}
                    type={field.type}
                    as={Input}
                    id={field.name}
                    value={getFieldValue(field.name)}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                  />
                  <ErrorMessage
                    name={field.name}
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

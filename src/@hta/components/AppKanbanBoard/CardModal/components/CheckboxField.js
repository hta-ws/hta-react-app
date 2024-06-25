import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function CheckboxField(props) {
  const [checkedItems, setCheckedItems] = useState(new Map());

  const handleCheckItem = (e) => {
    const { name, value } = e.target;
    let items = new Map(checkedItems);
    if (checkedItems.has(name)) {
      items.delete(name);
    } else {
      items.set(name, value);
    }
    setCheckedItems(items);
    props.setFieldValue(props.name, Array.from(items.values()).toString());
  };

  return (
    <FormGroup>
      <Label>{props.label}</Label>
      {props.options.map((opt, index) => {
        const inputName = `${props.name}-${index}`;
        return (
          <FormGroup check key={index}>
            <Label check>
              <Input
                type='checkbox'
                name={inputName}
                value={opt}
                checked={checkedItems.get(inputName)}
                onBlur={props.handleBlur}
                onChange={handleCheckItem}
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

CheckboxField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  touched: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default CheckboxField;

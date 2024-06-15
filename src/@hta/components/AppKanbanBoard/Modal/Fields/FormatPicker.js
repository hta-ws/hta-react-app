import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Field, ErrorMessage } from 'formik';

const FormatPicker = ({ name, label, value, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleTypeChange = (e) => {
    const currentValue = value ? JSON.parse(value) : {};
    const updatedFormat = { ...currentValue, type: e.target.value };
    onChange(JSON.stringify(updatedFormat));
  };

  const handleDecimalChange = (e) => {
    const currentValue = value ? JSON.parse(value) : {};
    const updatedFormat = {
      ...currentValue,
      decimal: e.target.value,
    };
    onChange(JSON.stringify(updatedFormat));
  };

  const handlePrefixChange = (e) => {
    const currentValue = value ? JSON.parse(value) : {};
    const updatedFormat = {
      ...currentValue,
      prefix: e.target.value,
    };
    onChange(JSON.stringify(updatedFormat));
  };

  const format = value
    ? JSON.parse(value)
    : { type: '', decimal: '', prefix: '' };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <div className='d-flex'>
        <Field
          name={name}
          as={Input}
          type='text'
          value={JSON.stringify(format)}
          readOnly
        />
        <Button color='primary' onClick={toggleModal} className='ml-2'>
          Edit
        </Button>
      </div>
      <ErrorMessage name={name} component='div' className='text-danger' />
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Format</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for={`${name}_type`}>Type</Label>
            <Input
              type='select'
              name={`${name}_type`}
              id={`${name}_type`}
              value={format.type}
              onChange={handleTypeChange}
            >
              <option value=''>Select Type</option>
              <option value='number'>Number</option>
              <option value='string'>String</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for={`${name}_decimal`}>Decimal</Label>
            <Input
              type='number'
              name={`${name}_decimal`}
              id={`${name}_decimal`}
              value={format.decimal}
              onChange={handleDecimalChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for={`${name}_prefix`}>Prefix</Label>
            <Input
              type='text'
              name={`${name}_prefix`}
              id={`${name}_prefix`}
              value={format.prefix}
              onChange={handlePrefixChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for={`${name}_suffix`}>Prefix</Label>
            <Input
              type='text'
              name={`${name}_suffix`}
              id={`${name}_suffix`}
              value={format.suffix}
              onChange={handlePrefixChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggleModal}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </FormGroup>
  );
};

export default FormatPicker;

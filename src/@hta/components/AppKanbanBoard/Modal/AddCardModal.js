import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import CardForm from './CardForm';

const AddCardModal = ({ isOpen, toggle, onSubmit, laneId, cardId }) => {
  const [selectedType, setSelectedType] = useState('');
  const [formStructure, setFormStructure] = useState(null);
  const [initialValues, setInitialValues] = useState({
    type: '',
    title: '',
    format: {
      type: '',
      decimals: '',
      prefix: '',
      suffix: '',
    },
    laneId: laneId || '',
    properties: {},
  });

  const [
    { loading: formLoading, apiData: formApiData, error: formError },
    { setQueryParams: setFormQueryParams },
  ] = useGetDataApi({
    controller: 'report',
    action: 'get-form-structure',
    method: 'GET',
    initialData: null,
    initialCall: false,
  });

  const [
    { loading: cardLoading, apiData: cardApiData, error: cardError },
    { setQueryParams: setCardQueryParams },
  ] = useGetDataApi({
    controller: 'report',
    action: 'get-card',
    method: 'GET',
    initialData: null,
    initialCall: false,
  });

  useEffect(() => {
    if (selectedType) {
      setFormQueryParams({ type: selectedType });
    }
  }, [selectedType, setFormQueryParams, cardId]);

  useEffect(() => {
    if (formApiData) {
      setFormStructure(formApiData);
    }
  }, [formApiData]);

  useEffect(() => {
    if (cardId && isOpen) {
      setCardQueryParams({ id: cardId, initialCall: true });
      setInitialValues({
        type: '',
        title: '',
        format: {
          type: '',
          decimals: '',
          prefix: '',
          suffix: '',
        },
        laneId: laneId || '',
        properties: {},
      });
      setFormStructure(null);
    }
  }, [cardId, isOpen, laneId, setCardQueryParams]);

  useEffect(() => {
    if (cardApiData) {
      setInitialValues({
        type: cardApiData.type,
        title: cardApiData.title,
        format: cardApiData.properties.format,
        laneId: cardApiData.laneId,
        properties: cardApiData.properties,
      });
      setSelectedType(cardApiData.type);
    }
  }, [cardApiData]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCancel = () => {
    setSelectedType('');
    toggle();
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className='modal-fullscreen'>
      <ModalHeader toggle={toggle}>
        {cardId ? 'Edit Card' : 'Add New Card'}
      </ModalHeader>
      <ModalBody className='bg-background-adaptive-09'>
        {formLoading && <div>Loading form structure...</div>}
        {formError && <div>Error loading form structure: {formError}</div>}
        <CardForm
          initialValues={initialValues}
          formStructure={formStructure}
          onSubmit={handleSubmit}
          handleCancel={handleCancel}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button type='submit' color='primary' onClick={() => document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
          Submit
        </Button>
        <Button type='button' color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type='button'
          color='info'
          onClick={() => document.querySelector('form').dispatchEvent(new Event('validate', { cancelable: true, bubbles: true }))}
        >
          Validate
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddCardModal;

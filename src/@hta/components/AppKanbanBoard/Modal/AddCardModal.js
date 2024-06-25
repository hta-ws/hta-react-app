import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import CardForm from './CardForm';

const AddCardModal = ({ isOpen, toggle, onSubmit, laneId, cardId }) => {
  const [selectedType, setSelectedType] = useState('');
  const [formStructure, setFormStructure] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

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

  const [{ apiData: cardApiData }, { setQueryParams: setCardQueryParams }] =
    useGetDataApi({
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
  }, [selectedType, setFormQueryParams]);

  useEffect(() => {
    if (formApiData && formApiData.fields) {
      setFormStructure(formApiData);
      const initialValues = {
        type: '',
        title: '',
        laneId: laneId || '',
        properties: {},
      };
      Object.keys(formApiData.fields).forEach((groupKey) => {
        formApiData.fields[groupKey].rows.forEach((row) => {
          row.forEach((field) => {
            if (field.name.startsWith('properties')) {
              const keys = field.name.split('.');
              keys.reduce((acc, key, index) => {
                if (!acc[key])
                  acc[key] =
                    index === keys.length - 1 ? field.defaultValue || '' : {};
                return acc[key];
              }, initialValues);
            }
          });
        });
      });
      setInitialValues(initialValues);
    }
  }, [formApiData, laneId]);

  useEffect(() => {
    if (cardId && isOpen) {
      setCardQueryParams({ id: cardId, initialCall: true });
    }
  }, [cardId, isOpen, setCardQueryParams]);

  useEffect(() => {
    if (cardApiData) {
      const updatedValues = {
        type: cardApiData.type,
        title: cardApiData.title,
        laneId: cardApiData.laneId,
        properties: cardApiData.properties || {},
      };
      setInitialValues(updatedValues);
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
    const submitValues = {
      ...values,
      laneId: laneId || values.laneId,
    };

    console.log('Submit values: ', submitValues); // Kontrol için ekleyin
    onSubmit(submitValues);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className='modal-fullscreen'>
      <ModalHeader toggle={toggle}>
        {cardId ? 'Edit Card' : 'Add New Card'}
      </ModalHeader>
      <ModalBody className='bg-background-adaptive-09'>
        {formLoading && <div>Loading form structure...</div>}
        {formError && <div>Error loading form structure: {formError}</div>}
        {initialValues && formStructure && (
          <CardForm
            initialValues={initialValues}
            formStructure={formStructure}
            onSubmit={handleSubmit}
            handleCancel={handleCancel}
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          type='submit'
          color='primary'
          onClick={() =>
            document
              .querySelector('form')
              .dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true }),
              )
          }
        >
          Submit
        </Button>
        <Button type='button' color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type='button'
          color='info'
          onClick={() =>
            document
              .querySelector('form')
              .dispatchEvent(
                new Event('validate', { cancelable: true, bubbles: true }),
              )
          }
        >
          Validate
        </Button>
      </ModalFooter>
    </Modal>
  );
};

AddCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  laneId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AddCardModal;

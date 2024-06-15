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
    properties: {
      dataSource: {
        reportCode: '',
        valueType: '',
      },
      label: '',
      format: {
        type: '',
        decimals: '',
        prefix: '',
        suffix: '',
      },
    },
    laneId: laneId || '',
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
    }
  }, [cardId, isOpen, setCardQueryParams]);

  useEffect(() => {
    if (cardApiData) {
      setInitialValues({
        type: cardApiData.type,
        title: cardApiData.title,
        properties: cardApiData.properties,
        laneId: cardApiData.laneId,
      });
      setSelectedType(cardApiData.type);
    }
  }, [cardApiData]);

  const handleCancel = () => {
    setSelectedType('');
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className='modal-fullscreen'>
      <ModalHeader toggle={toggle}>
        {cardId ? 'Edit Card' : 'Add New Card'}
      </ModalHeader>
      <ModalBody>
        {formLoading && <div>Loading form structure...</div>}
        {formError && <div>Error loading form structure: {formError}</div>}
        <CardForm
          initialValues={initialValues}
          formStructure={formStructure}
          onSubmit={onSubmit}
          handleCancel={handleCancel}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddCardModal;

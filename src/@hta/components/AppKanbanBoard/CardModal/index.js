import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import FormSelector from './FormSelector';

const CardModal = ({ isOpen, toggle, onSubmit, laneId, cardId, pageId }) => {
  const [initialValues, setInitialValues] = useState({ type: '', title: '' });

  const [{ apiData: cardData }, { setQueryParams: fetchCard }] = useGetDataApi({
    controller: 'report',
    action: 'get-card',
    initialCall: false,
  });

  useEffect(() => {
    if (cardId) {
      fetchCard({ id: cardId });
    } else {
      setInitialValues({ type: '', title: '' });
    }
  }, [cardId, isOpen]);

  useEffect(() => {
    console.log('cardData', cardData);
    if (cardData) {
      setInitialValues(cardData);
    }
  }, [cardData, cardId]);

  const handleFormSubmit = (values) => {
    const combinedValues = {
      ...initialValues,
      ...values,
      ...{ page_id: pageId }, // pageId'yi ekleyin
    };
    onSubmit(combinedValues);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size='xl'>
      <ModalHeader toggle={toggle}>Kartı Düzenle</ModalHeader>
      <ModalBody>
        <FormSelector
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          cardId={cardId}
          pageId={pageId} // pageId'yi FormSelector'a pass edin
        />
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggle}>
          Cancel
        </Button>
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
      </ModalFooter>
    </Modal>
  );
};

CardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  laneId: PropTypes.number,
  cardId: PropTypes.number,
  pageId: PropTypes.number.isRequired, // pageId prop tipi
};

export default CardModal;

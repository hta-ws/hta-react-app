import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';
import RunLogByTemplate from './RunLogByTemplate'; // Updated import

const RunLogModal = ({ isOpen, toggle, templateId, entityType = 'code' }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>Run Log</ModalHeader>
      <ModalBody>
        <RunLogByTemplate templateId={templateId} entityType={entityType} />
      </ModalBody>
    </Modal>
  );
};

RunLogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  templateId: PropTypes.number.isRequired,
  entityType: PropTypes.string, // Added entityType prop
};

export default RunLogModal;

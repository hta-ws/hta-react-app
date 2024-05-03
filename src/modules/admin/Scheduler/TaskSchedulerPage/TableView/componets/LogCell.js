import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; // Popover yerine Modal ve ModalBody'yi import ediyoruz
import PropTypes from 'prop-types';
import './LogCell.scss'; // Gerekirse stil dosyasını güncelleyin

function LogCell({ value, title }) {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const getFirstNonEmptyLine = (text) => {
    const lines = text.split('\n');
    for (let line of lines) {
      if (line.trim() !== '') {
        return line;
      }
    }
    return ''; // Tüm satırlar boş ise boş string döndür
  };
  return (
    <div className='d-flex align-items-center text-wrap'>
      <div className='flex-grow-1'>
        <p
          className='text-muted mb-0'
          onClick={toggleModal}
          style={{ cursor: 'pointer' }}
        >
          {/* Tıklanabilir metin veya buton ekleyin */}
          <span className='fw-medium text-wrap'>
            {value ? getFirstNonEmptyLine(value) : ''}
          </span>
        </p>
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          className='custom-modal'
          size='xl'
          centered
          scrollable={true}
        >
          <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
          <ModalBody className='terminal-style p-4'>
            {/* ModalBody içindeki içeriği bir <pre> etiketi içinde terminal tarzında göster */}
            <pre>{value ? value : 'No data'}</pre>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

LogCell.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

LogCell.defaultProps = {
  value: null,
  rowId: '',
  title: 'Çalışma Logu',
};

export default LogCell;

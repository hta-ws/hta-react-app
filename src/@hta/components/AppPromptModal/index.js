import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const AppPromptModal = ({
  show,
  onDeleteClick,
  onCloseClick,
  title,
  subject,
}) => {
  const isHTML = typeof subject === 'object' && subject.__html;
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className='py-3 px-5'>
        <div className='mt-2 text-center'>
          <lord-icon
            src='https://cdn.lordicon.com/gsqxdxog.json'
            trigger='loop'
            colors='primary:#f7b84b,secondary:#f06548'
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className='mt-4 pt-2 fs-15 mx-4 mx-sm-5'>
            <h4>{title}</h4>
            {isHTML ? (
              <p
                className='text-muted mx-4 mb-0'
                dangerouslySetInnerHTML={subject}
              />
            ) : (
              <p className='text-muted mx-4 mb-0'>{subject}</p>
            )}
          </div>
        </div>
        <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
          <button
            type='button'
            className='btn w-sm btn-light'
            data-bs-dismiss='modal'
            onClick={onCloseClick}
          >
            Hayır
          </button>
          <button
            type='button'
            className='btn w-sm btn-danger '
            id='delete-record'
            onClick={onDeleteClick}
          >
            Evet
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

AppPromptModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
  title: PropTypes.string,
  subject: PropTypes.string,
};

AppPromptModal.defaultProps = {
  title: 'Eminmisiniz ?',
  subject: 'Are you sure you want to remove this record ?',
};
export default AppPromptModal;

// renderActionCell.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'; // Import necessary components
import classNames from 'classnames'; // Import classNames or similar utility

import { Link } from 'react-router-dom';
const ActionCell = (cellProps, actions) => {
  const { onClickDeleteTask, onClickRunTask, onClickStopTask } = actions;

  const id = cellProps?.row?.original?.id || 0;
  const editable = cellProps?.row?.original?.editable || false;

  const notEditableClass = classNames('btn btn-sm btn-light remove-list', {
    'btn-disabled-c': !editable,
  });
  const editableClass = classNames('btn btn-sm btn-light remove-list', {
    'btn-disabled-c': editable,
  });

  return (
    <div className='hstack  return {-1'>
      <Button
        className={notEditableClass}
        title='Görevi Sil'
        disabled={cellProps.row.original.statusId == 5}
        onClick={() => onClickDeleteTask(cellProps.row.original)}
      >
        <i className='ri-delete-bin-5-fill align-middle' />
      </Button>
      {/* Assuming DisabledLink is a custom component, make sure to import it */}
      <Link
        className='btn btn-sm btn-light ri-xl edit-list'
        title='Değişiklik Yap'
        disabled={cellProps.row.original.statusId == 5}
        to={`/admin/task/edit/${id}`}
        // isEnabled={editable}
      >
        <i className='ri-pencil-fill ri-xl align-middle' />
      </Link>
      <Link
        className='btn btn-sm btn-light edit-log'
        title='Logları göster'
        to={`/admin/task/log/${id}`}
      >
        <i className='ri-equalizer-fill ri-xl align-middle' />
      </Link>
      <Button
        className={notEditableClass}
        title='Çalıştır'
        disabled={cellProps.row.original.statusId == 5}
        onClick={() => onClickRunTask(cellProps.row.original)}
      >
        <i className='ri-play-fill ri-xl align-middle' />
      </Button>
      <Button
        className={editableClass}
        title='Görevi Durdur'
        disabled={cellProps.row.original.statusId != 5}
        onClick={() => onClickStopTask(cellProps.row.original)}
      >
        <i className='ri-stop-fill ri-xl align-middle' />
      </Button>
    </div>
  );
};

ActionCell.propTypes = {
  cellProps: PropTypes.shape({
    row: PropTypes.shape({
      original: PropTypes.shape({
        id: PropTypes.any.isRequired,
        editable: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onClickDeleteTask: PropTypes.func.isRequired,
  onClickRunTask: PropTypes.func.isRequired,
  onClickStopTask: PropTypes.func.isRequired,
};

export default ActionCell;

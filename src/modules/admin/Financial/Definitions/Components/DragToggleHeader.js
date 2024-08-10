import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';

/**
 * DragToggleHeader component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isDraggable - Determines if drag mode is enabled
 * @param {function} props.onToggleDrag - Function to toggle drag mode
 */
export const DragToggleHeader = ({ isDraggable, onToggleDrag }) => {
  return (
    <div className='form-check form-switch form-switch-right form-switch-md '>
      <Label className='form-label text-muted'>Drag Mode</Label>
      <Input
        className='form-check-input'
        type='checkbox'
        checked={isDraggable}
        onChange={onToggleDrag}
      />
    </div>
  );
};

DragToggleHeader.propTypes = {
  isDraggable: PropTypes.bool.isRequired,
  onToggleDrag: PropTypes.func.isRequired,
};

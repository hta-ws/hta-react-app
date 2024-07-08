import React from 'react';
import { Input, Label } from 'reactstrap';

const DragToggleHeader = ({ isDraggable, onToggleDrag }) => {
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

export default DragToggleHeader;

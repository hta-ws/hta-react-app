/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { flexRender } from '@tanstack/react-table';

const DraggableRow = ({ row, reorderRow, onClick, trClass }) => {
  const [collectedProps, dropRef] = useDrop({
    accept: 'row',
    hover: (item) => {
      // Sürüklenen satırın üzerine gelindiğinde işlemler
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = row.index;

      // Sürüklenen satırın üzerine gelinen satırı tespit et
      if (dragIndex === hoverIndex) {
        return;
      }

      // İşlemler...
    },

    drop: (draggedRow) => {
      // Burada bir nesne döndürmek yerine doğrudan fonksiyonu çağırın
      reorderRow(draggedRow.original.id, row.original.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => ({ ...row, index: row.index }),
    type: 'row',
  });

  // Sürüklenen satırın üzerine gelindiğinde stil değişikliği
  const rowStyle = {
    opacity: isDragging ? 0.5 : 1,
    borderTop: collectedProps.isOver ? '2px dotted blue ' : '',
  };
  const dragStyle = {
    cursor: isDragging ? 'grab' : 'grab',
  };

  return (
    <tr
      ref={previewRef}
      style={rowStyle}
      className={trClass(row)}
      onClick={() => onClick(row.original)}
    >
      <td ref={dropRef}>
        <div ref={dragRef} style={dragStyle}>
          🟰
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

DraggableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    cells: PropTypes.arrayOf(
      PropTypes.shape({
        getCellProps: PropTypes.func.isRequired,
        render: PropTypes.func.isRequired,
        id: PropTypes.any.isRequired,
      }),
    ),
    getVisibleCells: PropTypes.func.isRequired,
  }).isRequired,
  reorderRow: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  trClass: PropTypes.func.isRequired,
};

export default DraggableRow;

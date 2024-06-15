import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './KanbanCard.css';

const KanbanCard = ({ card, onDelete, onEdit }) => {
  const cardLabel = card.properties?.label || card.title;

  return (
    <Card className='card task-box kanban-card'>
      <CardBody>
        <div className='d-flex justify-content-between align-items-center'>
          <h6 className='fs-15 mb-0 flex-grow-1 text-truncate task-title'>
            <Link to='#' className='d-block text-capitalize'>
              {card.type}
            </Link>
          </h6>
        </div>
        <p className='text-muted mt-4'>{cardLabel}</p>
      </CardBody>
      <div className='kanban-card-footer d-flex justify-content-between'>
        <Button
          color='link'
          size='sm'
          onClick={() => console.log('View clicked')}
        >
          <i className='ri-eye-fill align-bottom me-2 text-muted'></i> View
        </Button>
        <Button color='link' size='sm' onClick={() => onEdit(card.id)}>
          <i className='ri-pencil-fill align-bottom me-2 text-muted'></i> Edit
        </Button>
        <Button color='link' size='sm' onClick={() => onDelete(card.id)}>
          <i className='ri-delete-bin-fill align-bottom me-2 text-muted'></i>{' '}
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default KanbanCard;

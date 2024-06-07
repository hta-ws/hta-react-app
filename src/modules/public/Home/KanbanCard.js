import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './KanbanCard.css';

const KanbanCard = ({ card, onDelete }) => {
  return (
    // <Card className='kanban-card'>
    //   <CardBody>
    //     <CardTitle tag='h5' className='kanban-card-title'>
    //       {card.content}
    //     </CardTitle>
    //     <CardText>15 mins</CardText>
    //     <CardText>2 Gallons of milk at the Deli store</CardText>
    //     <Button
    //       close
    //       className='kanban-card-delete'
    //       onClick={() => onDelete(card.id)}
    //     />
    //   </CardBody>
    // </Card>
    <div className='card kanban-card'>
      <div className='card-header'>
        <Button
          type='button'
          className='btn-close float-end fs-11'
          aria-label='Close'
        ></Button>
        <Button
          type='button'
          className='btn-close float-end fs-11'
          aria-label='Close'
          onClick={() => onDelete(card.id)}
        ></Button>
        <h6 className='card-title mb-0 fs-14 fw-bold'>{card.content}</h6>
      </div>

      <div className='card-body'></div>
      {/* <div className='card-footer'>
        <a
          className='link-success float-end'
          href='/velzon/react/master/ui-cards'
        >
          Read More{' '}
          <i className='ri-arrow-right-s-line align-middle ms-1 lh-1'></i>
        </a>
        <p className='text-muted mb-0'>1 days Ago</p>
      </div> */}
    </div>
  );
};

KanbanCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default KanbanCard;

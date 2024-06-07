import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col, Button } from 'reactstrap';
import KanbanCard from './KanbanCard';
import './Lane.css';

const Lane = ({ lane, cards, index, onAddCard, onDeleteCard }) => {
  return (
    <Draggable draggableId={lane.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Row className='kanban-lane'>
            <Col
              xs='auto'
              className='kanban-lane-title'
              {...provided.dragHandleProps}
            >
              <span className='rotate-text'>{lane.title}</span>
              <Button
                color='link'
                className='add-card-button'
                onClick={() => onAddCard(lane.id)}
              >
                +
              </Button>
            </Col>
            <Col className='kanban-cards-container'>
              <Droppable
                droppableId={lane.id}
                direction='horizontal'
                type='card'
              >
                {(provided) => (
                  <div
                    className={`kanban-cards ${cards.length === 0 ? 'empty-lane' : ''}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {cards.map((card, index) => (
                      <Draggable
                        draggableId={card.id}
                        index={index}
                        key={card.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard card={card} onDelete={onDeleteCard} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </div>
      )}
    </Draggable>
  );
};

Lane.propTypes = {
  lane: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
  onAddCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};

export default Lane;

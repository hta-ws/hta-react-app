import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col, Button } from 'reactstrap';
import KanbanCard from './KanbanCard';
import './Lane.css';

const Lane = ({ lane, index, onAddCard, onDeleteCard }) => {
  return (
    <Draggable draggableId={lane.id.toString()} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Row className='kanban-lane'>
            <Col
              xs='1'
              className='kanban-lane-titles'
              {...provided.dragHandleProps}
            >
              <div className='d-flex flex-column align-items-center'>
                <span className='mb-3'>{lane.title}</span>
                <Button
                  className='btn-soft-info w-100'
                  data-bs-toggle='modal'
                  data-bs-target='#creatertaskModal'
                  onClick={() => onAddCard(lane.id)}
                >
                  Add More
                </Button>
              </div>
            </Col>
            <Col className='kanban-cards-container'>
              <Droppable
                droppableId={lane.id.toString()}
                direction='horizontal'
                type='card'
              >
                {(provided) => (
                  <div
                    className={`kanban-cards ${lane.children.length === 0 ? 'empty-lane' : ''}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {lane.children.map((card, index) => (
                      <Draggable
                        draggableId={card.id.toString()}
                        index={index}
                        key={card.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard
                              card={card}
                              onDelete={() => onDeleteCard(lane.id, card.id)}
                            />
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

export default Lane;

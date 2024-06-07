import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import './KanbanBoard.css';
import Lane from './Lane';

// Başlangıç verileri
const initialData = {
  lanes: {
    'lane-1': {
      id: 'lane-1',
      title: 'Lane 1',
      cardIds: ['card-1', 'card-2', 'card-3'],
    },
    'lane-2': {
      id: 'lane-2',
      title: 'Lane 2',
      cardIds: ['card-4', 'card-5', 'card-6'],
    },
    'lane-3': {
      id: 'lane-3',
      title: 'Lane 3',
      cardIds: ['card-7', 'card-8', 'card-9'],
    },
  },
  cards: {
    'card-1': { id: 'card-1', content: 'Buy milk' },
    'card-2': { id: 'card-2', content: 'Card 2' },
    'card-3': { id: 'card-3', content: 'Card 3' },
    'card-4': { id: 'card-4', content: 'Card 4' },
    'card-5': { id: 'card-5', content: 'Card 5' },
    'card-6': { id: 'card-6', content: 'Card 6' },
    'card-7': { id: 'card-7', content: 'Card 7' },
    'card-8': { id: 'card-8', content: 'Card 8' },
    'card-9': { id: 'card-9', content: 'Card 9' },
  },
  laneOrder: ['lane-1', 'lane-2', 'lane-3'],
};

const KanbanBoard = () => {
  const [data, setData] = React.useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'lane') {
      const newLaneOrder = Array.from(data.laneOrder);
      newLaneOrder.splice(source.index, 1);
      newLaneOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        laneOrder: newLaneOrder,
      };

      setData(newState);
      return;
    }

    const startLane = data.lanes[source.droppableId];
    const finishLane = data.lanes[destination.droppableId];

    if (startLane === finishLane) {
      const newCardIds = Array.from(startLane.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newLane = {
        ...startLane,
        cardIds: newCardIds,
      };

      const newState = {
        ...data,
        lanes: {
          ...data.lanes,
          [newLane.id]: newLane,
        },
      };

      setData(newState);
      return;
    }

    const startCardIds = Array.from(startLane.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startLane,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishLane.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishLane,
      cardIds: finishCardIds,
    };

    const newState = {
      ...data,
      lanes: {
        ...data.lanes,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleDeleteCard = (cardId) => {
    const newCards = { ...data.cards };
    delete newCards[cardId];

    const newLanes = { ...data.lanes };
    Object.keys(newLanes).forEach((laneId) => {
      newLanes[laneId].cardIds = newLanes[laneId].cardIds.filter(
        (id) => id !== cardId,
      );
    });

    setData({
      ...data,
      cards: newCards,
      lanes: newLanes,
    });
  };

  const addNewLane = () => {
    const newLaneId = `lane-${Date.now()}`;
    const newLane = {
      id: newLaneId,
      title: `Lane ${data.laneOrder.length + 1}`,
      cardIds: [],
    };

    const newState = {
      ...data,
      lanes: {
        ...data.lanes,
        [newLaneId]: newLane,
      },
      laneOrder: [...data.laneOrder, newLaneId],
    };

    setData(newState);
  };

  const addNewCard = (laneId) => {
    const newCardId = `card-${Date.now()}`;
    const newCard = {
      id: newCardId,
      content: `Card ${Object.keys(data.cards).length + 1}`,
    };

    const newState = {
      ...data,
      cards: {
        ...data.cards,
        [newCardId]: newCard,
      },
      lanes: {
        ...data.lanes,
        [laneId]: {
          ...data.lanes[laneId],
          cardIds: [...data.lanes[laneId].cardIds, newCardId],
        },
      },
    };

    setData(newState);
  };

  return (
    <>
      <div className='kanban-header'>
        <h1 className='kanban-title'>My Kanban Board</h1>
        <Button color='primary' onClick={addNewLane}>
          Yeni Satır Ekle
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-lanes' direction='vertical' type='lane'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.laneOrder.map((laneId, index) => {
                const lane = data.lanes[laneId];
                const cards = lane.cardIds.map((cardId) => data.cards[cardId]);

                return (
                  <Lane
                    key={lane.id}
                    lane={lane}
                    cards={cards}
                    index={index}
                    onAddCard={addNewCard}
                    onDeleteCard={handleDeleteCard}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;

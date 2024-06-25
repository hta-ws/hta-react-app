import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import './KanbanBoard.css';
import Lane from './Lane';
import AddCardModal from './Modal/AddCardModal';
import { useGetDataApi } from '@hta/hooks/APIHooks';

const AppKanbanBoard = () => {
  const [{ loading, apiData, error }, { setQueryParams, submitData }] =
    useGetDataApi({
      controller: 'report',
      action: 'get-report-data',
      method: 'POST',
      initialData: [],
      initialCall: true,
    });

  const [data, setData] = useState(apiData);
  const [versionId, setVersionId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaneId, setSelectedLaneId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    if (apiData) {
      setData(apiData);
      if (apiData.length > 0) {
        setVersionId(apiData[0].version);
      }
    }
  }, [apiData]);

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

    const newData = [...data];

    if (type === 'lane') {
      const [movedLane] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, movedLane);
      setData(newData);

      const updatePayload = {
        fromIndex: source.index,
        toIndex: destination.index,
        laneId: draggableId,
        action: 'orderChange',
        versionId: versionId,
      };
      submitData(updatePayload, 'POST', 'update-lane-order');
    } else {
      const sourceLaneIndex = newData.findIndex(
        (lane) => lane.id.toString() === source.droppableId,
      );
      const destLaneIndex = newData.findIndex(
        (lane) => lane.id.toString() === destination.droppableId,
      );
      const sourceLane = newData[sourceLaneIndex];
      const destLane = newData[destLaneIndex];
      const [movedCard] = sourceLane.children.splice(source.index, 1);

      if (sourceLane === destLane) {
        destLane.children.splice(destination.index, 0, movedCard);
        setData(newData);
        const updatePayload = {
          laneId: sourceLane.id,
          cards: destLane.children.map((card, index) => ({
            id: card.id,
            sortOrder: index + 1,
          })),
          versionId: versionId,
          action: 'orderChange',
        };
        submitData(updatePayload, 'POST', 'update-card-order');
      } else {
        destLane.children.splice(destination.index, 0, movedCard);
        setData(newData);

        const updatePayload = {
          laneId: destLane.id,
          cards: destLane.children.map((card, index) => ({
            id: card.id,
            sortOrder: index + 1,
          })),
          versionId: versionId,
          action: 'laneChange',
        };
        submitData(updatePayload, 'POST', 'update-card-order');
      }
    }
  };

  const handleDeleteCard = (laneId, cardId) => {
    const newData = [...data];
    const laneIndex = newData.findIndex((lane) => lane.id === laneId);
    const lane = newData[laneIndex];
    lane.children = lane.children.filter((card) => card.id !== cardId);

    setData(newData);

    const deletePayload = {
      laneId: laneId,
      cardId: cardId,
      versionId: versionId,
    };
    submitData(deletePayload, 'POST', 'delete-card');
  };

  const addNewLane = () => {
    const newLane = {
      type: 'Row',
      title: `Lane ${data.length + 1}`,
      sort_order: data.length + 1,
      page_id: 1,
      properties: [],
      data: null,
      children: [],
      versionId: versionId,
    };

    const addLanePayload = {
      lane: newLane,
      versionId: versionId,
    };
    submitData(addLanePayload, 'POST', 'add-lane', (response, error) => {
      if (error) {
        console.error('Error adding lane:', error);
        return;
      }

      if (response && response.items && response.items.lane) {
        const newData = [...data, response.items.lane];
        setData(newData);
      }
    });
  };

  const addNewCard = (values) => {
    const newCard = {
      type: values.type,
      title: values.title,
      sort_order: data.reduce((acc, lane) => lane.children.length + acc, 0) + 1,
      page_id: 1,
      properties: {
        widgetProperty: values.widgetProperty,
        tableProperty: values.tableProperty,
        chartProperty: values.chartProperty,
      },
      data: {},
      versionId: versionId,
    };

    const addCardPayload = {
      laneId: values.laneId,
      card: newCard,
      versionId: versionId,
    };
    submitData(addCardPayload, 'POST', 'add-card', (response, error) => {
      if (error) {
        console.error('Error adding card:', error);
        return;
      }

      if (response && response.items && response.items.card) {
        const newData = [...data];
        const laneIndex = newData.findIndex(
          (lane) => lane.id === values.laneId,
        );
        newData[laneIndex].children.push(response.items.card);
        setData(newData);
      }
    });

    toggleModal();
  };

  const editCard = (values) => {
    // selectedCardId'yi values nesnesine ekleyin
    const editCardPayload = {
      ...values,
      id: selectedCardId,
    };

    submitData(editCardPayload, 'POST', 'update-card', (response, error) => {
      if (error) {
        console.error('Error editing card:', error);
        return;
      }

      if (response && response.items && response.items.card) {
        const newData = [...data];
        const laneIndex = newData.findIndex(
          (lane) => lane.id === editCardPayload.laneId,
        );
        const cardIndex = newData[laneIndex].children.findIndex(
          (card) => card.id === selectedCardId,
        );
        newData[laneIndex].children[cardIndex] = response.items.card;
        setData(newData);
      }
    });

    toggleModal();
  };

  const publishVersion = () => {
    const publishPayload = {
      versionId: versionId,
    };
    submitData(publishPayload, 'POST', 'publish-version');
  };

  const refreshData = () => {
    setQueryParams({ page_id: 1, version: versionId });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleAddCard = (laneId) => {
    setSelectedLaneId(laneId);
    setSelectedCardId(null); // Yeni kart eklerken cardId null olmalı
    toggleModal();
  };

  const handleEditCard = (laneId, cardId) => {
    console.log('Editing card with id:', cardId); // Bu log'u ekleyin
    setSelectedLaneId(laneId);
    setSelectedCardId(cardId); // Mevcut kartı düzenlerken cardId olmalı
    toggleModal();
  };

  return (
    <>
      <div className='kanban-header'>
        <h1 className='kanban-title'>My Kanban Board</h1>
        <Button color='primary' onClick={addNewLane}>
          Yeni Satır Ekle
        </Button>
        <Button color='success' onClick={publishVersion}>
          Yayınla
        </Button>
        <Button color='secondary' onClick={refreshData}>
          Yenile
        </Button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-lanes' direction='horizontal' type='lane'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='lane-container'
            >
              {data.map((lane, index) => (
                <Lane
                  key={lane.id}
                  lane={lane}
                  index={index}
                  onAddCard={() => handleAddCard(lane.id)}
                  onEditCard={(cardId) => handleEditCard(lane.id, cardId)}
                  onDeleteCard={handleDeleteCard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddCardModal
        isOpen={modalOpen}
        toggle={toggleModal}
        onSubmit={selectedCardId ? editCard : addNewCard}
        laneId={selectedLaneId}
        cardId={selectedCardId}
      />
    </>
  );
};

export default AppKanbanBoard;

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './KanbanBoard.css';
import Lane from './Lane';
import CardModal from './CardModal';
import { useGetDataApi } from '@hta/hooks/APIHooks';

const AppKanbanBoard = ({ pageId = null }) => {
  const [{ loading, apiData, error }, { setQueryParams, submitData }] =
    useGetDataApi({
      controller: 'report',
      action: 'get-report-data',
      method: 'POST',
      initialData: [],
      initialCall: false,
    });

  const [data, setData] = useState(apiData);
  const [versionId, setVersionId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaneId, setSelectedLaneId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardType, setCardType] = useState(''); // Kart tipi için durum ekleyin

  useEffect(() => {
    if (pageId) {
      setQueryParams({ page_id: pageId, version: versionId });
    }
  }, [pageId, versionId]);

  useEffect(() => {
    if (apiData) {
      setData(apiData);
      if (apiData.length > 0) {
        setVersionId(apiData[0].version);
      }
    }
  }, [apiData]);

  if (!pageId) {
    return (
      <div>Page ID tanımlı değil. Lütfen geçerli bir Page ID sağlayın.</div>
    );
  }

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
      pageId: pageId, // pageId'yi API isteğine ekleyin
    };
    submitData(deletePayload, 'POST', 'delete-card');
  };

  const addNewLane = () => {
    const newLane = {
      type: 'Row',
      title: `Lane ${data.length + 1}`,
      sort_order: data.length + 1,
      page_id: pageId, // pageId'yi yeni lane'e ekleyin
      properties: [],
      data: null,
      children: [],
      versionId: versionId,
    };

    const addLanePayload = {
      lane: newLane,
      versionId: versionId,
      pageId: pageId, // pageId'yi API isteğine ekleyin
    };
    submitData(addLanePayload, 'POST', 'add-lane', (response, error) => {
      if (error) {
        console.error('Error adding lane:', error);
        return;
      }

      if (response && response.items && response.items.lane) {
        const newData = [...data, response.items.lane];
        setData(newData);
        refreshData(); // Add this line to refresh data after adding a lane
      }
    });
  };

  const addNewCard = (values) => {
    const newCard = {
      ...{
        versionId: versionId,
        laneId: selectedLaneId,
        pageId: pageId, // pageId'yi yeni karta ekleyin
      },
      ...values,
    };
    const addCardPayload = {
      laneId: selectedLaneId,
      card: newCard,
      versionId: versionId,
      pageId: pageId, // pageId'yi API isteğine ekleyin
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
        refreshData(); // Add this line to refresh data after adding a card
      }
    });

    toggleModal();
  };

  const editCard = (values) => {
    const editCardPayload = {
      ...values,
      id: selectedCardId,
      pageId: pageId, // pageId'yi API isteğine ekleyin
    };

    submitData(editCardPayload, 'POST', 'update-card', (response, error) => {
      console.log('response', response, 'error', error);
      // debugger;
      // if (error) {
      //   console.error('Error editing card:', error);
      //   return;
      // }

      // if (response && response.items && response.items.card) {
      //   debugger;
      //   const newData = [...data];
      //   const laneIndex = newData.findIndex(
      //     (lane) => lane.id === editCardPayload.laneId,
      //   );
      //   const cardIndex = newData[laneIndex].children.findIndex(
      //     (card) => card.id === selectedCardId,
      //   );
      //   newData[laneIndex].children[cardIndex] = response.items.card;
      //   setData(newData);
      refreshData(); // Add this line to refresh data after editing a card
      // }
    });

    toggleModal();
  };

  const publishVersion = () => {
    const publishPayload = {
      versionId: versionId,
      pageId: pageId, // pageId'yi API isteğine ekleyin
    };
    submitData(publishPayload, 'POST', 'publish-version');
  };

  const refreshData = () => {
    setQueryParams({ page_id: pageId, version: versionId });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleAddCard = (laneId) => {
    setSelectedLaneId(laneId);
    setSelectedCardId(null); // Yeni kart eklerken cardId null olmalı
    setCardType('widget'); // Kart tipi için varsayılan değer
    toggleModal();
  };

  const handleEditCard = (laneId, cardId) => {
    setSelectedLaneId(laneId);
    setSelectedCardId(cardId); // Mevcut kartı düzenlerken cardId olmalı
    setCardType('widget'); // Kart tipi için varsayılan değer
    toggleModal();
  };

  return (
    <>
      {!pageId && (
        <div>Page ID tanımlı değil. Lütfen geçerli bir Page ID sağlayın.</div>
      )}
      {pageId && (
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
            <Droppable
              droppableId='all-lanes'
              direction='horizontal'
              type='lane'
            >
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
          <CardModal
            isOpen={modalOpen}
            toggle={toggleModal}
            onSubmit={selectedCardId ? editCard : addNewCard}
            cardType={cardType}
            cardId={selectedCardId}
            laneId={selectedLaneId}
            pageId={pageId} // CardModal'a pageId'yi pass edin
          />
        </>
      )}
    </>
  );
};

AppKanbanBoard.propTypes = {
  pageId: PropTypes.number, // pageId prop tipi
};

export default AppKanbanBoard;

import React, { ReactNode } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Row } from 'antd';
import CardItem from 'src/containers/KanBanList/CardItem';

const getBackgroundColor = (isDraggingOver: boolean, isDraggingFrom: boolean): string => {
  if (isDraggingOver) {
    return '';
  }
  if (isDraggingFrom) {
    return '';
  }
  return '';
};

interface Props {
  listId: string;
  listType: string;
  cards: CardItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  children: ReactNode;
}

const CardList = ({ listId, listType, cards = [], style, children }: Props) => {
  return (
    <Droppable droppableId={listId} type={listType}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <Row
          className={'wrapper-card-list'}
          {...dropProvided.droppableProps}
          style={{
            backgroundColor: getBackgroundColor(
              dropSnapshot.isDraggingOver,
              Boolean(dropSnapshot.draggingFromThisWith),
            ),
          }}>
          <div className={'scroll-wrapper'}>
            <div ref={dropProvided.innerRef} className={'card-list-content'}>
              <div className={'card-exist'}>
                {children}
                {cards.map((card: CardItem, index: number) => (
                  <Draggable draggableId={card.id.toString()} index={index} key={card.id}>
                    {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                      <CardItem
                        dragProvided={dragProvided}
                        dragSnapshot={dragSnapshot}
                        card={card}
                        listId={listId}
                        index={index}
                      />
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            </div>
          </div>
        </Row>
      )}
    </Droppable>
  );
};
export default CardList;

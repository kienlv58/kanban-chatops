import React, { useState } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import Header from './Header';
import CardList from './CardList';
import AddNewCard from './AddNewCard';
import './styles.scss';

interface Props {
  index: number;
  column: ColumnKanBan;
}

const Column = ({ index, column }: Props) => {
  const [isShowFormAddNew, setShowFormAddNew] = useState<boolean>(false);

  const handleClickShowHideFormAddNew = () => {
    setShowFormAddNew(prevState => !prevState);
  };

  return (
    <Draggable index={index} draggableId={column.id.toString()}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div className={'container'} {...provided.draggableProps} ref={provided.innerRef}>
          <Header
            provided={provided}
            title={column.title}
            isDragging={snapshot.isDragging}
            handleClickShowHideAddNew={handleClickShowHideFormAddNew}
          />
          <CardList
            listId={column.id.toString()}
            cards={column.cards}
            listType={'CARD'}
            style={{ backgroundColor: snapshot.isDragging ? '#3686be' : null }}>
            <AddNewCard
              isShowFormAddNew={isShowFormAddNew}
              handleClickShowHideFormAddNew={handleClickShowHideFormAddNew}
              listId={Number(column.id)}
            />
          </CardList>
        </div>
      )}
    </Draggable>
  );
};
export default Column;

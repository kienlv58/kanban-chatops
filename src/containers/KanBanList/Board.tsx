import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import Column from './Column';

interface Props {
  columns: ColumnKanBan[];
}

const Board = ({ columns }: Props) => {
  return (
    <Droppable droppableId={'board'} type={'COLUMN'} direction={'horizontal'}>
      {(provided: DroppableProvided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} className={'wrapper-children'}>
            {columns.map((column: ColumnKanBan, index: number) => (
              <Column column={column} key={column.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
export default Board;

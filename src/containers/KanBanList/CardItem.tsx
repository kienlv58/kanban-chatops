import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Row } from 'antd';
import './styles.scss';

interface Props {
  task: Task;
  index: number;
}

const CardItem = ({ task, index }: Props) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {dragProvided => {
        // console.log('dragProvided', dragProvided);
        return (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            className={'card-item'}>
            <Row>{task.title}</Row>
          </div>
        );
      }}
    </Draggable>
  );
};
export default CardItem;

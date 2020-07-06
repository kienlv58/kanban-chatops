import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import List from './List';
import './styles.scss';
import { selectListData, updateListData, fetchDataKanBanList } from './kanbanSildeData';

const KanBanList = () => {
  const params = useParams<{ boardId?: string }>();
  const listData = useSelector(selectListData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataKanBanList());
  }, []);

  const handleDragEnd = (result: DropResult) => {
    dispatch(updateListData(result));
  };

  return (
    <AppLayout>
      <div className={'board-name'}>Board {params.boardId}</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'board'} type={'COLUMN'} direction="horizontal">
          {(provided: DroppableProvided, snapshot) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className={'wrapper-list-parent'}>
                {listData.map((col, index) => (
                  <Draggable draggableId={col.id.toString()} index={index}>
                    {(dragProvided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                      return (
                        <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                          <List col={col} key={col.title} dragProvided={dragProvided} />
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </AppLayout>
  );
};
export default KanBanList;

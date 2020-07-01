import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import List from './List';
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
        <Row>
          {listData.map(col => (
            <List col={col} key={col.title} />
          ))}
        </Row>
      </DragDropContext>
    </AppLayout>
  );
};
export default KanBanList;

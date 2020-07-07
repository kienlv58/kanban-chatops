import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../components/AppLayout';
import './styles.scss';
import { selectListData, updateListData, fetchDataKanBanList } from './kanbanSildeData';
import Board from './Board';
import AddNewColumn from './AddNewColumn';

const KanBanList = () => {
  const params = useParams<{ boardId?: string }>();
  const listData = useSelector(selectListData);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataKanBanList());
  }, []);

  const handleDragEnd = (result: DropResult) => {
    dispatch(updateListData(result));
  };

  return (
    <AppLayout>
      <Row className={'kanban-header'}>
        <Col className={'board-name'}> Board {params.boardId}</Col>
        <Button size={'large'} onClick={() => setIsShowModal(true)}>
          <PlusOutlined />
          {t('addNewBoard')}
        </Button>
      </Row>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className={'parent-container'}>
          <Board columns={listData} />
        </Row>
      </DragDropContext>
      <AddNewColumn isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </AppLayout>
  );
};
export default KanBanList;

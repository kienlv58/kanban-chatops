import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../components/AppLayout';
import './styles.scss';
import { selectListData, clearData } from './kanbanSildeData';
import useFetchKanBanList from './useFetchKanBanList';
import Board from './Board';
import AddNewColumn from './AddNewColumn';
import DrawerSetting from './DrawerSetting';

const KanBanList = () => {
  const params = useParams<{ boardId?: string; boardName?: string }>();
  const listData = useSelector(selectListData);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetchListKanBan, isLoading, reOrderKanBanList, reOrderCard, moveCard } = useFetchKanBanList();

  useEffect(() => {
    if (params.boardId) fetchListKanBan(Number(params.boardId));
    return () => {
      dispatch(clearData());
    };
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    const desIndex = destination?.index;
    const sourceIndex = source.index;
    if (result.type === 'COLUMN') {
      reOrderKanBanList(Number(params.boardId), result);
    } else if (result.type === 'CARD' && destination && desIndex !== undefined && sourceIndex !== undefined) {
      if (destination?.droppableId !== source.droppableId) {
        moveCard(result);
      } else if (destination?.droppableId === source.droppableId) reOrderCard(result);
    }
  };

  return (
    <AppLayout title={params.boardName}>
      <Row className={'kanban-header'}>
        <Col className={'board-name'}> {params.boardName}</Col>
        <Row>
          <Button size={'large'} onClick={() => setIsShowModal(true)} className={'btn-add-new'}>
            <PlusOutlined />
            {t('addNewBoard')}
          </Button>
          <DrawerSetting />
        </Row>
      </Row>
      {isLoading ? (
        <Skeleton />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Row className={'parent-container'}>
            <Board columns={listData} />
          </Row>
        </DragDropContext>
      )}
      <AddNewColumn isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </AppLayout>
  );
};
export default KanBanList;

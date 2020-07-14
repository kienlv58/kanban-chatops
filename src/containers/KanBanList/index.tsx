import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../components/AppLayout';
import './styles.scss';
import { selectListData, updateListData, clearData } from './kanbanSildeData';
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
  const { fetchListKanBan, isLoading } = useFetchKanBanList();

  useEffect(() => {
    if (params.boardId) fetchListKanBan(Number(params.boardId));
    return () => {
      dispatch(clearData());
    };
  }, []);

  const handleDragEnd = (result: DropResult) => {
    dispatch(updateListData(result));
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

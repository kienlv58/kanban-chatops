import { useRef, useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DropResult } from 'react-beautiful-dnd';
import produce from 'immer';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import { axiosInstance } from 'src/utils/fetchHelpers';
import apiMap from 'src/utils/apiMap';
import {
  setKanBanData,
  selectListData,
  createNewCardLocal,
  updateCardLocal,
  deleteCardLocal,
  moveCardLocal,
  reOrderCardLocal,
  reOrderKanBanLocal,
} from './kanbanSildeData';

const useFetchKanBanList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams<{ boardId?: string; boardName?: string }>();
  const listData = useSelector(selectListData);
  const dispatch = useDispatch();

  const fetchListKanBan = async (boardId: number, isShowLoading = true) => {
    try {
      isShowLoading && setIsLoading(true);
      const { data } = await axiosInstance.get<ListResponse<ColumnKanBan>>(apiMap.list, {
        params: {
          'filter[board_id]': boardId,
          include: 'cards,cards.labels',
        },
      });
      const transformData = data.data.map(item => ({ ...item, cards: item.cards || [] }));
      dispatch(setKanBanData({ boardId: 1, listData: transformData }));
      console.log('data fetch list', data);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
      isShowLoading && setIsLoading(false);
    }
  };

  const fetchListKanBanWithDelay = useRef(debounce(fetchListKanBan, 3000));

  const createNewKanBanList = async (boardId: number, bodyData: PostNewColumnKanBan) => {
    try {
      const { data } = await axiosInstance.post<ListResponse<ColumnKanBan>>(apiMap.list, bodyData);
      console.log('data post', data);
      await fetchListKanBan(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const editKanBanList = async (boardId: number, listId: number, bodyData: Partial<PostNewColumnKanBan>) => {
    try {
      const { data } = await axiosInstance.put<ListResponse<ColumnKanBan>>(`${apiMap.list}/${listId}`, bodyData);
      console.log('data put', data);
      await fetchListKanBan(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const deleteKanBanList = async (boardId: number, listId: number) => {
    try {
      const { data } = await axiosInstance.delete<ListResponse<Board>>(`${apiMap.list}/${listId}`);
      console.log('data delete', data);
      await fetchListKanBan(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };
  const reOrderKanBanList = async (boardId: number, result: DropResult) => {
    try {
      const { destination, source } = result;
      if (!destination) return;
      const desIndex = destination?.index;
      const sourceIndex = source.index;
      const newDataList = produce(listData, draftData => {
        const [sourceItem] = draftData.splice(sourceIndex, 1);
        draftData.splice(desIndex, 0, sourceItem);
      });

      dispatch(reOrderKanBanLocal(newDataList));
      const ids = newDataList.map(item => item.id);
      await axiosInstance.put<ListResponse<Board>>(`${apiMap.list}/reorder`, { list_ids: ids });
      await fetchListKanBanWithDelay.current(boardId, false);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const createNewCard = async (bodyData: PostNewCard) => {
    try {
      dispatch(createNewCardLocal(bodyData));
      const { data } = await axiosInstance.post<ListResponse<CardItem>>(apiMap.card, bodyData);
      console.log('data post card', data);
      await fetchListKanBan(Number(params.boardId));
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const editCard = async (cardId: number, bodyData: PostNewCard) => {
    try {
      dispatch(updateCardLocal({ cardId, cardItemPost: bodyData }));
      const { data } = await axiosInstance.put<ListResponse<CardItem>>(`${apiMap.card}/${cardId}`, bodyData);
      console.log('data put card', data);
      await fetchListKanBan(Number(params.boardId));
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const deleteCard = async (cardId: number, listId: number) => {
    try {
      dispatch(deleteCardLocal({ cardId, listId }));
      const { data } = await axiosInstance.delete<ListResponse<CardItem>>(`${apiMap.card}/${cardId}`);
      console.log('data delete card', data);
      await fetchListKanBan(Number(params.boardId));
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const reOrderCard = async (result: DropResult) => {
    try {
      const { destination, source } = result;
      if (!destination) return;
      const desIndex = destination?.index;
      const sourceIndex = source.index;

      const findColumnChangeIndex = listData.findIndex(item => item.id.toString() === destination?.droppableId);
      if (findColumnChangeIndex > -1) {
        const newDataCards = produce(listData[findColumnChangeIndex].cards, draftCards => {
          const [sourceItem] = draftCards.splice(sourceIndex, 1);
          draftCards.splice(desIndex, 0, sourceItem);
        });

        const newDataList = produce(listData, draftList => {
          draftList[findColumnChangeIndex].cards = newDataCards;
        });
        dispatch(reOrderCardLocal(newDataList));

        const ids = newDataCards.map(item => item.id);
        await axiosInstance.put(`${apiMap.card}/reorder`, { card_ids: ids });

        await fetchListKanBanWithDelay.current(Number(params.boardId), false);
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const moveCard = async (result: DropResult) => {
    try {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      const listSourceIndex = listData.findIndex(item => {
        return item.id.toString() === source.droppableId;
      });
      const listDestIndex = listData.findIndex(item => {
        return item.id.toString() === destination?.droppableId;
      });

      if (listDestIndex === -1 || listSourceIndex === -1) return;
      const dragItem = listData[listSourceIndex].cards.find(item => item.id.toString() === draggableId.toString());
      if (!dragItem) return;

      const newListData = produce(listData, draftList => {
        const [removeItem] = draftList[listSourceIndex].cards.splice(source.index, 1);
        draftList[listDestIndex].cards.splice(destination?.index, 0, removeItem);
      });

      dispatch(moveCardLocal(newListData));

      const newIdsDestination = newListData[listDestIndex].cards.map(item => item.id);

      await axiosInstance.put(`${apiMap.card}/move`, {
        from_list_id: source.droppableId,
        to_list_id: destination.droppableId,
        card_id: draggableId,
        to_list_cards: newIdsDestination,
      });
      await fetchListKanBanWithDelay.current(Number(params.boardId), false);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  return {
    isLoading,
    fetchListKanBan,
    createNewKanBanList,
    editKanBanList,
    deleteKanBanList,
    reOrderKanBanList,
    createNewCard,
    editCard,
    deleteCard,
    reOrderCard,
    moveCard,
  };
};

export default useFetchKanBanList;

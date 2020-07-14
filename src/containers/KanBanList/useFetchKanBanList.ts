import { useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DropResult } from 'react-beautiful-dnd';
import produce from 'immer';
import { axiosInstance } from 'src/utils/fetchHelpers';
import apiMap from 'src/utils/apiMap';
import { setKanBanData, selectListData, updateListData } from './kanbanSildeData';

const useFetchKanBanList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listData = useSelector(selectListData);
  const dispatch = useDispatch();

  const fetchListKanBan = async (boardId: number, isShowLoading = true) => {
    try {
      isShowLoading && setIsLoading(true);
      const { data } = await axiosInstance.get<ListResponse<ColumnKanBan>>(apiMap.list, {
        params: {
          'filter[board_id]': boardId,
        },
      });
      // dispatch(updateListBoard(data));
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
      dispatch(updateListData(result));
      const { destination, source, type } = result;
      const desIndex = destination?.index;
      const sourceIndex = source.index;
      if (type === 'COLUMN' && desIndex !== undefined && sourceIndex !== undefined && desIndex !== sourceIndex) {
        const newData = produce(listData, draftData => {
          const [sourceItem] = draftData.splice(sourceIndex, 1);
          draftData.splice(desIndex, 0, sourceItem);
        });
        const ids = newData.map(item => item.id);
        const { data } = await axiosInstance.put<ListResponse<Board>>(`${apiMap.list}/reorder`, { list_ids: ids });
        console.log('data reorder', data);
        await fetchListKanBan(boardId, false);
      }
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  return { isLoading, fetchListKanBan, createNewKanBanList, editKanBanList, deleteKanBanList, reOrderKanBanList };
};

export default useFetchKanBanList;

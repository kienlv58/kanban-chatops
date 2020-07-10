import { useState } from 'react';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { axiosInstance } from 'src/utils/fetchHelpers';
import apiMap from 'src/utils/apiMap';
import { labels } from 'src/containers/KanBanList/fakeData';
import { setKanBanData } from 'src/containers/KanBanList/kanbanSildeData';

const useFetchKanBanList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchListKanBan = async (boardId: number) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get<ListResponse<ColumnKanBan>>(apiMap.list, {
        params: {
          'filter[board_id]': boardId,
        },
      });
      // dispatch(updateListBoard(data));
      const transformData = data.data.map(item => ({ ...item, cards: item.cards || [] }));
      dispatch(setKanBanData({ boardId: 1, listData: transformData, listLabel: labels }));
      console.log('data fetch list', data);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
      setIsLoading(false);
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

  return { isLoading, fetchListKanBan, createNewKanBanList, editKanBanList, deleteKanBanList };
};

export default useFetchKanBanList;

import { useState } from 'react';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { axiosInstance } from 'src/utils/fetchHelpers';
import apiMap from 'src/utils/apiMap';
import { updateListBoard } from './homeSildeData';

const useFetchBoard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchListBoard = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get<ListResponse<Board>>(apiMap.board, {
        params: {
          includes: 'list',
        },
      });
      dispatch(updateListBoard(data));
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewBoard = async (bodyData: PostBoardData) => {
    try {
      const { data } = await axiosInstance.post<ListResponse<Board>>(apiMap.board, bodyData);
      console.log('data post', data);
      await fetchListBoard();
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const editBoard = async (boardId: number, bodyData: PostBoardData) => {
    try {
      const { data } = await axiosInstance.put<ListResponse<Board>>(`${apiMap.board}/${boardId}`, bodyData);
      console.log('data put', data);
      await fetchListBoard();
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const deleteBoard = async (boardId: number) => {
    try {
      const { data } = await axiosInstance.delete<ListResponse<Board>>(`${apiMap.board}/${boardId}`);
      console.log('data delete', data);
      await fetchListBoard();
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  return { isLoading, fetchListBoard, createNewBoard, editBoard, deleteBoard };
};

export default useFetchBoard;

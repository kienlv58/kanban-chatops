import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { axiosInstance } from 'src/utils/fetchHelpers';
import apiMap from 'src/utils/apiMap';
import { updateLabel } from 'src/containers/KanBanList/kanbanSildeData';

const useFetchLabelList = () => {
  const dispatch = useDispatch();

  const fetchListLabel = async (boardId: number) => {
    try {
      const { data } = await axiosInstance.get<ListResponse<LabelItem>>(apiMap.label, {
        params: {
          'filter[board_id]': boardId,
        },
      });
      dispatch(updateLabel({ labels: data?.data || [] }));
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const createNewLabel = async (boardId: number, bodyData: PostNewLabel) => {
    try {
      const { data } = await axiosInstance.post<ListResponse<LabelItem>>(apiMap.label, bodyData);
      console.log('data post', data);
      await fetchListLabel(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const editLabel = async (boardId: number, labelId: number, bodyData: Partial<PostNewLabel>) => {
    try {
      const { data } = await axiosInstance.put<ListResponse<LabelItem>>(`${apiMap.label}/${labelId}`, bodyData);
      console.log('data put', data);
      await fetchListLabel(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  const deleteLabel = async (boardId: number, labelId: number) => {
    try {
      const { data } = await axiosInstance.delete<ListResponse<LabelItem>>(`${apiMap.label}/${labelId}`);
      console.log('data delete', data);
      await fetchListLabel(boardId);
    } catch (e) {
      console.log(e);
      notification.error({ message: e.message.toString() });
    } finally {
    }
  };

  return { fetchListLabel, createNewLabel, editLabel, deleteLabel };
};

export default useFetchLabelList;

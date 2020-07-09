import React, { useState } from 'react';
import { Modal, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewColumn } from './kanbanSildeData';
import useFetchKanBanList from './useFetchKanBanList';

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewColumn = ({ isShowModal, setIsShowModal }: Props) => {
  const [title, setTitle] = useState<string>('');
  const params = useParams<{ boardId?: string }>();
  const dispatch = useDispatch();
  const { createNewKanBanList } = useFetchKanBanList();

  const handleOk = () => {
    setIsShowModal(false);
    dispatch(addNewColumn({ title }));
    createNewKanBanList(Number(params.boardId), { board_id: Number(params.boardId), title, created_by: 'Kienlv' });
    setTitle('');
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={() => setIsShowModal(false)}
      okButtonProps={{ disabled: title.length === 0 }}
      destroyOnClose={true}
      className={'add-new-column'}>
      <Row>
        <label>Title:</label>
        <Input onChange={value => setTitle(value.target.value)} maxLength={50} />
      </Row>
    </Modal>
  );
};
export default AddNewColumn;

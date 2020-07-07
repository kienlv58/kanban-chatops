import React, { useState } from 'react';
import { Modal, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { addNewColumn } from './kanbanSildeData';

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewColumn = ({ isShowModal, setIsShowModal }: Props) => {
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  return (
    <Modal
      visible={isShowModal}
      onOk={() => {
        setIsShowModal(false);
        dispatch(addNewColumn({ title }));
        setTitle('');
      }}
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

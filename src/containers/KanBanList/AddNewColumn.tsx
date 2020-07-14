import React from 'react';
import { Modal, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewColumn } from './kanbanSildeData';
import useFetchKanBanList from './useFetchKanBanList';

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewColumn = ({ isShowModal, setIsShowModal }: Props) => {
  const params = useParams<{ boardId?: string }>();
  const dispatch = useDispatch();
  const { createNewKanBanList } = useFetchKanBanList();

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsShowModal(false);
    const title = form.getFieldValue('columnTitle');
    dispatch(addNewColumn({ title }));
    createNewKanBanList(Number(params.boardId), { board_id: Number(params.boardId), title, created_by: 'Kienlv' });
    clearForm();
  };

  const clearForm = () => {
    form.resetFields();
    form.setFields([{ name: 'columnTitle', value: '' }]);
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={() => {
        setIsShowModal(false);
        clearForm();
      }}
      // okButtonProps={{ disabled: title.length === 0 }}
      destroyOnClose={true}
      className={'add-new-column'}>
      <Form form={form} onFinish={handleOk} autoComplete={'off'}>
        <label>Title:</label>
        <Form.Item
          name="columnTitle"
          rules={[{ required: true, message: 'column title is required' }]}
          className={'form-item-card'}>
          <Input maxLength={50} autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddNewColumn;

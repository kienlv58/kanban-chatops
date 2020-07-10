import React, { useEffect } from 'react';
import { Modal, Input, Row, Form, Button } from 'antd';
import useFetchBoard from './useFetchBoard';

const { TextArea } = Input;

interface Props {
  dataModal: DataModal;
  setDataModal: React.Dispatch<React.SetStateAction<DataModal>>;
}

const AddNewBoard = ({ dataModal, setDataModal }: Props) => {
  const [form] = Form.useForm();
  const { createNewBoard, editBoard } = useFetchBoard();

  useEffect(() => {
    form.setFields([
      { name: 'boardTitle', value: dataModal.board?.title },
      { name: 'boardDescription', value: dataModal.board?.description },
    ]);
  }, [dataModal.board]);

  const handleClickOk = () => {
    const title = form.getFieldValue('boardTitle') || dataModal?.board?.title;
    const description = form.getFieldValue('boardDescription') || dataModal?.board?.description;

    if (dataModal.board) {
      editBoard(dataModal.board.id, {
        title,
        description,
        created_by: 'kienlv',
      });
    } else {
      createNewBoard({ title, description, created_by: 'kienlv' });
    }
    setDataModal({ visible: false, board: undefined });
  };

  const handleCancelModal = () => {
    setDataModal({ visible: false, board: undefined });
  };

  const renderFooterModal = () => (
    <Row className={'modal-footer-board'}>
      <Button key="back" onClick={handleCancelModal}>
        Cancel
      </Button>
      <Form.Item shouldUpdate={true} className={'form-submit'}>
        {() => (
          <Button
            key="submit"
            type="primary"
            onClick={handleClickOk}
            disabled={
              (!dataModal.board && !form.isFieldsTouched(true)) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length > 0
            }>
            Submit
          </Button>
        )}
      </Form.Item>
    </Row>
  );

  return (
    <Form form={form} className={'add-new-board-form'} autoComplete={'off'}>
      <Modal
        visible={dataModal.visible}
        title={'Add New board'}
        onCancel={handleCancelModal}
        footer={renderFooterModal()}
        destroyOnClose={true}
        className={'add-new-board-modal'}>
        <label>Title:</label>
        <Form.Item
          name="boardTitle"
          initialValue={dataModal.board?.title}
          rules={[{ required: true, message: 'board title is required' }]}
          className={'form-item-board'}>
          <Input placeholder={'Enter title for this board'} />
        </Form.Item>
        <label>Description:</label>
        <Form.Item
          name="boardDescription"
          initialValue={dataModal.board?.description}
          rules={[{ required: true, message: 'board description is required' }]}
          className={'form-item-board'}>
          <TextArea placeholder={'Enter description for this board'} rows={5} maxLength={255} />
        </Form.Item>
      </Modal>
    </Form>
  );
};
export default AddNewBoard;

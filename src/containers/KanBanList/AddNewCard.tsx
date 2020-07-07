import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { createNewCard } from './kanbanSildeData';

interface Props {
  handleClickShowHideFormAddNew: () => void;
  isShowFormAddNew: boolean;
  listId: number;
}

const AddNewCard = ({ isShowFormAddNew, handleClickShowHideFormAddNew, listId }: Props) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleClickShowHideAddNew = () => {
    form.resetFields(['cardTitle']);
    handleClickShowHideFormAddNew();
  };

  const handleAddNewCard = () => {
    const title = form.getFieldValue('cardTitle');
    dispatch(createNewCard({ listId, title }));
    form.resetFields();
    handleClickShowHideFormAddNew();
  };

  if (!isShowFormAddNew) return <></>;

  return (
    <Form form={form} className={'card-add-new'} onFinish={handleAddNewCard} autoComplete={'off'}>
      <Form.Item
        name="cardTitle"
        rules={[{ required: true, message: 'card title is required' }]}
        className={'form-item-card'}>
        <Input placeholder={'Enter title for this card'} className={'input-card-title'} />
      </Form.Item>
      <Form.Item shouldUpdate={true} className={'form-item-card'}>
        {() => (
          <Row className={'action-add-new'}>
            <Button
              className={'btn-new-card'}
              type="primary"
              onClick={handleAddNewCard}
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0
              }>
              {' '}
              Add Card
            </Button>
            <CloseOutlined onClick={handleClickShowHideAddNew} style={{ fontSize: '20px' }} />
          </Row>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddNewCard;

import React, { useState } from 'react';
import { Button, Row, Input, Form } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createNewCard } from './kanbanSildeData';
import CardItem from './CardItem';

import './styles.scss';

interface Props {
  col: ListItem;
}

const List = ({ col }: Props) => {
  const [showFormAddNew, setShowFormAddNew] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleClickShowHideAddNew = () => {
    form.resetFields(['cardTitle']);
    setShowFormAddNew(prevState => !prevState);
  };

  const handleAddNewCard = () => {
    const title = form.getFieldValue('cardTitle');
    dispatch(createNewCard({ listId: col.id, title }));
    setShowFormAddNew(prevState => !prevState);
  };

  const renderAddNewCard = () => {
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

  return (
    <div className={'wrapper-list'}>
      <Row className={'title-list'}>
        <label>{col.title}</label>
        <Button size={'middle'} className={'btn-new-card'} onClick={handleClickShowHideAddNew}>
          <PlusOutlined />
        </Button>
      </Row>
      <Droppable droppableId={col.id.toString()} key={col.id}>
        {(provided, snapshot) => {
          return (
            <>
              {showFormAddNew && renderAddNewCard()}
              <div
                className={'card-item-wrapper'}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : '#ebecf0',
                }}>
                {col.cards.map((card, index) => {
                  if (!card) return <></>;
                  return <CardItem card={card} index={index} key={card.id} listId={col.id} />;
                })}
                {provided.placeholder}
              </div>
            </>
          );
        }}
      </Droppable>
    </div>
  );
};
export default List;

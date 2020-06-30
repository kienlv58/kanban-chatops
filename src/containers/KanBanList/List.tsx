import React, { useState } from 'react';
import { Button, Row, Input, Form } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import CardItem from './CardItem';

import './styles.scss';

interface Props {
  col: ListItem;
}

const List = ({ col }: Props) => {
  const [showFormAddNew, setShowFormAddNew] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleClickShowHideAddNew = () => {
    form.resetFields(['cardTitle']);
    setShowFormAddNew(prevState => !prevState);
  };

  const renderAddNewCard = () => {
    return (
      <Form form={form} className={'card-add-new'}>
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
      <Droppable droppableId={col.title} key={col.title}>
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
                {col.task.map((task, index) => {
                  if (!task) return <></>;
                  return <CardItem task={task} index={index} key={task.id} />;
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

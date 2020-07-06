import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Avatar, Row, Tag } from 'antd';
import './styles.scss';
import CardModal from './CardModal';
import { selectLabelById } from './kanbanSildeData';

interface Props {
  card: CardItem;
  index: number;
  listId: number;
}

const CardItem = ({ card, index, listId }: Props) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const label = useSelector(selectLabelById(card.labelId));

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Draggable draggableId={card.id.toString()} index={index}>
        {dragProvided => {
          return (
            <div
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}
              onClick={() => {
                setIsShowModal(true);
              }}
              className={'card-item'}>
              <Row>{card.title}</Row>
              <Row>
                <Row className={'wrapper-label'}>
                  {card.dueDate && (
                    <Tag color="#ec9488" className={'card-label'}>
                      <FieldTimeOutlined /> {card.dueDate}
                    </Tag>
                  )}
                  {label && (
                    <Tag color={label.color} className={'card-label'}>
                      {label.name}
                    </Tag>
                  )}
                </Row>
                {card.assigned && (
                  <Avatar
                    className={'avatar-user'}
                    gap={1}
                    // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  >
                    {card.assigned[0]}
                  </Avatar>
                )}
              </Row>
            </div>
          );
        }}
      </Draggable>
      <CardModal card={card} isShowModal={isShowModal} hideModal={hideModal} listId={listId} />
    </>
  );
};
export default CardItem;

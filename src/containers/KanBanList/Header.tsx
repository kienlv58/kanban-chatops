import React from 'react';
import { Button, Row } from 'antd';
import { DraggableProvided } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  isDragging: boolean;
  provided: DraggableProvided;
  title: string;
  handleClickShowHideAddNew: () => void;
}

const Header = ({ isDragging, provided, title, handleClickShowHideAddNew }: Props) => {
  return (
    <Row
      className={'header'}
      style={{ backgroundColor: isDragging ? '#3686be' : 'lightgrey' }}
      {...provided.dragHandleProps}>
      <label>{title}</label>
      <Button size={'middle'} className={'btn-new-card'} onClick={handleClickShowHideAddNew}>
        <PlusOutlined />
      </Button>
    </Row>
  );
};

export default Header;

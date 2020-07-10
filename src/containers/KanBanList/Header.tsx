import React, { useState } from 'react';
import { Button, Row, Input, Modal } from 'antd';
import { DraggableProvided } from 'react-beautiful-dnd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useFetchKanBanList from 'src/containers/KanBanList/useFetchKanBanList';

const { confirm } = Modal;

interface Props {
  isDragging: boolean;
  column: ColumnKanBan;
  provided: DraggableProvided;
  handleClickShowHideAddNew: () => void;
}

const Header = ({ isDragging, provided, column, handleClickShowHideAddNew }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleLocal, setTitle] = useState(column.title);

  const { editKanBanList, deleteKanBanList } = useFetchKanBanList();

  const handleSubmitEdit = () => {
    setIsEdit(false);
    editKanBanList(column.board_id, column.id, { board_id: column.board_id, title: titleLocal });
  };

  const handleDeleteKanBanList = () => {
    confirm({
      title: 'Are you sure delete this column?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return deleteKanBanList(column.board_id, column.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <Row
      className={'header'}
      style={{ backgroundColor: isDragging ? '#3686be' : 'rgb(194, 203, 208)' }}
      {...provided.dragHandleProps}>
      {isEdit ? (
        <Input
          defaultValue={titleLocal}
          className={'title'}
          autoFocus
          onBlur={handleSubmitEdit}
          onKeyDown={event => {
            if (event.key === 'Enter') handleSubmitEdit();
          }}
          maxLength={50}
          onChange={value => setTitle(value.target.value)}
        />
      ) : (
        <Row className={'title'} onClick={() => setIsEdit(true)} style={{ paddingLeft: 5 }}>
          {titleLocal}
        </Row>
      )}
      <DeleteOutlined className={'icon-delete'} onClick={handleDeleteKanBanList} />
      <Button size={'middle'} className={'btn-new-card'} onClick={handleClickShowHideAddNew}>
        <PlusOutlined />
      </Button>
    </Row>
  );
};

export default Header;

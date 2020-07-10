import React, { useState } from 'react';
import { Input, Row, Col, Button, Tag, Typography, Descriptions, Modal, Form, Dropdown, Menu, DatePicker } from 'antd';
import {
  UserOutlined,
  TagOutlined,
  FieldTimeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectLabelById, selectListLabel, updateCard, deleteCard } from './kanbanSildeData';
import './styles.scss';

const { Link } = Typography;
const { TextArea } = Input;

const { confirm } = Modal;

interface Props {
  card: CardItem;
  listId: number;
  isShowModal: boolean;
  hideModal: () => void;
}

const CardModal = ({ card, isShowModal, hideModal, listId }: Props) => {
  const [disabled, setDisable] = useState(true);
  const [showPopupDate, setShowPopupDate] = useState(false);
  const label = useSelector(selectLabelById(card.labelId));
  const labels = useSelector(selectListLabel);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const resetModal = () => {
    hideModal();
    setDisable(true);
  };
  const handleCancel = () => {
    resetModal();
    form.resetFields();
  };
  const handleOk = () => {
    const title = form.getFieldValue('cardTitle');
    const description = form.getFieldValue('cardDescription');
    dispatch(updateCard({ listId, cardItem: { ...card, title, description } }));
    resetModal();
  };

  const renderUserAssigned = () => {
    return (
      <Menu
        onClick={value => {
          dispatch(updateCard({ listId, cardItem: { ...card, assigned: value.key } }));
        }}>
        <Menu.Item key={'kienlv'}>kienlv</Menu.Item>
        <Menu.Item key={'maiht'}>maiht</Menu.Item>
      </Menu>
    );
  };

  const handleDeleteCard = () => {
    confirm({
      title: 'Are you sure delete this cardd?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteCard({ listId, cardId: card.id }));
        resetModal();
      },
      // onCancel() {},
    });
  };

  const renderListLabel = () => {
    return (
      <Menu
        className={'menu-label'}
        onClick={value => {
          dispatch(updateCard({ listId, cardItem: { ...card, labelId: Number(value.key) } }));
        }}>
        {labels.map(item => (
          <Menu.Item className={'item-label'} key={item.id}>
            <Tag color={item.color} className={'tag'}>
              {item.name}
            </Tag>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const renderLeftCard = () => {
    return (
      <Col span={18}>
        <Row className={'edit-card'}>
          <label>Title</label>
          <EditOutlined
            onClick={() => {
              setDisable(false);
            }}
          />
        </Row>

        <Form form={form} autoComplete={'off'}>
          <Form.Item
            name="cardTitle"
            initialValue={card.title}
            rules={[{ required: true, message: 'card title is required' }]}
            className={'form-item-card'}>
            <Input placeholder={'Enter title for this card'} className={'input-card-title'} disabled={disabled} />
          </Form.Item>
          <label>Description</label>
          <Form.Item name="cardDescription" className={'form-item-card'} initialValue={card.description}>
            <TextArea
              rows={5}
              disabled={disabled}
              placeholder={'No description'}
              style={{ resize: disabled ? 'none' : 'vertical', marginTop: 5 }}
            />
          </Form.Item>
        </Form>

        <Descriptions>
          {card.assigned && (
            <Descriptions.Item label="Assigned">
              <Link> {card.assigned}</Link>
            </Descriptions.Item>
          )}
          {label && (
            <Descriptions.Item label="Label">
              <Tag color={label.color}>{label.name}</Tag>
            </Descriptions.Item>
          )}
          {card.dueDate && (
            <Descriptions.Item label="DueDate">
              <Tag color="#ec9488">
                <FieldTimeOutlined /> {card.dueDate}
              </Tag>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Col>
    );
  };

  const renderRightCard = () => {
    return (
      <Col span={6} className={'right-card'}>
        <label>ADD TO CARD</label>
        <Dropdown overlay={renderUserAssigned} trigger={['click']}>
          <Button className={'btn-right'} icon={<UserOutlined />}>
            Assign
          </Button>
        </Dropdown>
        <Dropdown overlay={renderListLabel} trigger={['click']} placement={'bottomLeft'}>
          <Button className={'btn-right'} icon={<TagOutlined />}>
            Label
          </Button>
        </Dropdown>
        <Row className={'btn-right'}>
          <Button
            className={'btn-due-date'}
            icon={<FieldTimeOutlined />}
            onClick={() => {
              setShowPopupDate(true);
            }}>
            Due Date
          </Button>
          <DatePicker
            format={'DD/MM/YYYY'}
            className={'date-picker'}
            open={showPopupDate}
            onChange={(date, dateString) => {
              setShowPopupDate(false);
              dispatch(updateCard({ listId, cardItem: { ...card, dueDate: dateString } }));
            }}
            onOpenChange={open => {
              if (!open) setShowPopupDate(false);
            }}
            onBlur={() => setShowPopupDate(false)}
          />
        </Row>

        <label>ACTIONS</label>
        <Button className={'btn-right'} icon={<DeleteOutlined />} onClick={handleDeleteCard}>
          Delete Card
        </Button>
      </Col>
    );
  };

  return (
    <Modal
      visible={isShowModal}
      onCancel={handleCancel}
      onOk={handleOk}
      width={800}
      className={'card-modal'}
      destroyOnClose={true}>
      <Row className={'card-modal-content'}>
        {renderLeftCard()}
        {renderRightCard()}
      </Row>
    </Modal>
  );
};
export default CardModal;

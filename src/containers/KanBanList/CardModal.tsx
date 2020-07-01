import React, { useState } from 'react';
import { Input, Row, Col, Button, Tag, Typography, Descriptions, Modal, Form } from 'antd';
import { UserOutlined, TagOutlined, FieldTimeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateCard } from './kanbanSildeData';
import './styles.scss';

const { Link } = Typography;
const { TextArea } = Input;

interface Props {
  card: CardItem;
  listId: number;
  isShowModal: boolean;
  hideModal: () => void;
}

const CardModal = ({ card, isShowModal, hideModal, listId }: Props) => {
  const [disabled, setDisable] = useState(true);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const resetModal = () => {
    hideModal();

    setDisable(true);
    form.resetFields(['cardTitle', 'cardDescription']);
  };
  const handleCancel = () => {
    resetModal();
  };
  const handleOk = () => {
    const title = form.getFieldValue('cardTitle');
    const description = form.getFieldValue('cardDescription');
    dispatch(updateCard({ listId, cardItem: { ...card, title, description } }));
    resetModal();
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
            {card.label && (
              <Descriptions.Item label="Label">
                <Tag color="#f50">{card.label}</Tag>
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
        <Col span={6} className={'right-card'}>
          <label>ADD TO CARD</label>
          <Button className={'btn-right'} icon={<UserOutlined />}>
            Assign
          </Button>
          <Button className={'btn-right'} icon={<TagOutlined />}>
            Label
          </Button>
          <Button className={'btn-right'} icon={<FieldTimeOutlined />}>
            Due Date
          </Button>
          <label>ACTIONS</label>
          <Button className={'btn-right'} icon={<DeleteOutlined />}>
            Delete Card
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
export default CardModal;

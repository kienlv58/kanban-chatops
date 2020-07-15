import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Button, Tag, Typography, Descriptions, Modal, Form, Dropdown, Menu, DatePicker } from 'antd';
import {
  UserOutlined,
  TagOutlined,
  FieldTimeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectLabelById, selectListLabel } from './kanbanSildeData';
import useFetchKanBanList from './useFetchKanBanList';
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

  const [infoCard, setInfoCard] = useState<{ assign?: string; labelSelected?: LabelItem; due_date?: string }>();

  const label = useSelector(selectLabelById(card.labels?.[0]?.id));
  const labels = useSelector(selectListLabel);

  const { editCard, deleteCard } = useFetchKanBanList();
  const [form] = Form.useForm();

  useEffect(() => {
    setInfoCard({ assign: card.assign, labelSelected: label, due_date: card.due_date });
  }, [card, label]);

  const resetModal = async () => {
    hideModal();
    setDisable(true);
  };
  const handleCancel = () => {
    resetModal();
    form.resetFields();
    setInfoCard({ assign: card.assign, labelSelected: label, due_date: card.due_date });
  };
  const handleOk = () => {
    const title = form.getFieldValue('cardTitle');
    const description = form.getFieldValue('cardDescription');
    editCard(card.id, {
      list_id: listId,
      created_by: card.created_by,
      title,
      description,
      assign: infoCard?.assign,
      label_ids: (infoCard?.labelSelected?.id && [infoCard?.labelSelected?.id]) || [],
      due_date: infoCard?.due_date,
    });
    resetModal();
  };

  const renderUserAssigned = () => {
    return (
      <Menu
        onClick={value => {
          setInfoCard({ ...infoCard, assign: value.key });
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
      async onOk() {
        await deleteCard(card.id, listId);
        return resetModal();
      },
      // onCancel() {},
    });
  };

  const renderListLabel = () => {
    return (
      <Menu
        className={'menu-label'}
        onClick={value => {
          const findLabelSelect = labels.find(lb => lb.id.toString() === value.key);
          if (findLabelSelect) setInfoCard({ ...infoCard, labelSelected: findLabelSelect });
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
          {infoCard?.assign && (
            <Descriptions.Item label="Assigned">
              <Link> {infoCard?.assign}</Link>
            </Descriptions.Item>
          )}
          {infoCard?.labelSelected && (
            <Descriptions.Item label="Label">
              <Tag color={infoCard?.labelSelected.color}>{infoCard?.labelSelected.name}</Tag>
            </Descriptions.Item>
          )}
          {infoCard?.due_date && (
            <Descriptions.Item label="DueDate">
              <Tag color="#ec9488">
                <FieldTimeOutlined /> {infoCard?.due_date}
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
            // value={infoCard?.due_date}
            open={showPopupDate}
            onChange={(date, dateString) => {
              setShowPopupDate(false);
              setInfoCard({ ...infoCard, due_date: dateString });
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

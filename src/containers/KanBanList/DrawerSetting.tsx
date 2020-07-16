import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, List, Modal, Row } from 'antd';
import { useParams } from 'react-router-dom';
import {
  SettingFilled,
  PlusOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useFetchLabelList from './useFetchLabelList';
import './styles.scss';
import { selectListLabel } from './kanbanSildeData';

const { confirm } = Modal;

const colors = ['#C62928', '#AD1457', '#9124A3', '#1565C0', '#00796B', '#795548', '#455A64', '#424242'];

const DrawerSetting = () => {
  const [showDrawer, setShowDrawer] = useState();
  const params = useParams<{ boardId?: string; boardName?: string }>();
  const [selectColor, setSelectColor] = useState(colors[0]);
  const [showFormAddNew, setShowFormAddNew] = useState<{ isShow: boolean; labelEdit?: LabelItem }>({
    isShow: false,
    labelEdit: undefined,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (showFormAddNew.labelEdit) {
      form.setFields([{ name: 'labelName', value: showFormAddNew.labelEdit.name }]);
      setSelectColor(showFormAddNew.labelEdit.color);
    }
  }, [showFormAddNew.labelEdit]);

  const listLabel = useSelector(selectListLabel);

  const { fetchListLabel, createNewLabel, editLabel, deleteLabel } = useFetchLabelList();
  useEffect(() => {
    params.boardId && fetchListLabel(Number(params.boardId));
  }, [params.boardId]);

  const handleSubmit = () => {
    const bodyData = {
      board_id: Number(params.boardId),
      color: selectColor,
      name: form.getFieldValue('labelName'),
      created_by: 'kienlv',
    };
    if (showFormAddNew.labelEdit) {
      editLabel(Number(params.boardId), showFormAddNew.labelEdit.id, bodyData);
    } else createNewLabel(Number(params.boardId), bodyData);

    setShowFormAddNew({ isShow: false, labelEdit: undefined });
    form.resetFields();
    form.setFields([{ name: 'labelName', value: '' }]);
    setSelectColor(colors[0]);
  };

  const handleCancel = () => {
    setShowFormAddNew({ isShow: false, labelEdit: undefined });
    form.resetFields();
    setSelectColor(colors[0]);
  };

  const handleDelete = (labelId: number) => {
    confirm({
      title: 'Are you sure delete this label?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleCancel();
        return deleteLabel(Number(params.boardId), labelId);
      },
      // onCancel() {},
    });
  };

  const renderItem = (item: LabelItem): ReactNode => {
    return (
      <List.Item>
        <Row className={'wrapper-label-item'} style={{ backgroundColor: item.color }}>
          {item.name}
        </Row>
        <EditOutlined
          className={'icon-edit-del'}
          onClick={() => setShowFormAddNew({ isShow: true, labelEdit: item })}
        />
        <DeleteOutlined className={'icon-edit-del'} onClick={() => handleDelete(item.id)} />
      </List.Item>
    );
  };

  const renderFooter = () => {
    return (
      <>
        {!showFormAddNew.isShow ? (
          <Button className={'btn-add-label'} onClick={() => setShowFormAddNew({ isShow: true, labelEdit: undefined })}>
            <PlusOutlined />
            Add Label
          </Button>
        ) : (
          <Form form={form} autoComplete={'off'}>
            <Form.Item
              name="labelName"
              rules={[{ required: true, message: 'label name is required' }]}
              className={'form-item-card'}>
              <Input placeholder={'Enter name for this label'} autoFocus />
            </Form.Item>
            {colors.map(c => (
              <Button
                onClick={() => setSelectColor(c)}
                style={{ background: c, width: 40, height: 40, borderRadius: 5, marginRight: 5, marginBottom: 5 }}>
                <CheckOutlined style={{ visibility: c === selectColor ? 'visible' : 'hidden', color: '#ffffff' }} />
              </Button>
            ))}
            <Form.Item shouldUpdate={true}>
              {() => (
                <Row className={'wrapper-button'}>
                  <Button
                    type="primary"
                    className={'btn-action-label'}
                    onClick={handleSubmit}
                    disabled={
                      (!showFormAddNew.labelEdit && !form.isFieldsTouched(true)) ||
                      form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                    }>
                    submit
                  </Button>
                  <Button type="primary" className={'btn-action-label'} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Row>
              )}
            </Form.Item>
          </Form>
        )}
      </>
    );
  };

  return (
    <>
      <Button size={'large'} onClick={() => setShowDrawer(true)} className={'btn-add-new setting'}>
        <SettingFilled />
        Setting
      </Button>
      <Drawer
        visible={showDrawer}
        title={'Setting'}
        width={300}
        onClose={() => setShowDrawer(false)}
        destroyOnClose={true}>
        <Row className={'drawer-content'}>
          <h3>Label:</h3>
          <List
            dataSource={listLabel}
            rowKey={item => item.id.toString()}
            renderItem={renderItem}
            split
            footer={renderFooter()}
          />
        </Row>
      </Drawer>
    </>
  );
};

export default DrawerSetting;

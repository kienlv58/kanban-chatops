import React, { ReactNode, useEffect, useState } from 'react';
import { List, Card, Row, Col, Button, Dropdown, Menu, Skeleton, Modal } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';
import AppLayout from '../../components/AppLayout';
import AddNewBoard from './AddNewColumn';
import useFetchBoard from './useFetchBoard';
import { selectListBoard } from './homeSildeData';

const { confirm } = Modal;

const Home = () => {
  const { isLoading, fetchListBoard, deleteBoard } = useFetchBoard();
  const listBoard = useSelector(selectListBoard);
  const [dataModal, setDataModal] = useState<DataModal>({ visible: false });

  useEffect(() => {
    fetchListBoard();
  }, []);

  const { t } = useTranslation();

  const handleDeleteBoard = (id: number) => {
    confirm({
      title: 'Are you sure delete this board?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return deleteBoard(id);
      },
      // onCancel() {},
    });
  };

  const menu = (item: Board) => (
    <Menu
      className={'dropdown-menu'}
      onClick={(param: ClickParam) => {
        param.domEvent.preventDefault();
        if (param.key === '1') setDataModal({ visible: true, board: item });
        else {
          handleDeleteBoard(item.id);
        }
      }}>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const renderHeaderItem = (item: Board) => {
    return (
      <Row className={'item-header'}>
        <Row className={'wrapper-title'}>
          <span className={'title'}>{item.title}</span>
        </Row>
        <Row className={'icon-menu'}>
          <Dropdown overlay={() => menu(item)} trigger={['click']} placement={'bottomRight'}>
            <MoreOutlined className={'icon-more'} />
          </Dropdown>
        </Row>
      </Row>
    );
  };

  const renderItem = (item: Board): ReactNode => {
    return (
      <List.Item className={'board-item'}>
        <Link to={`/board/${item.id}/${item.title}`}>
          <Card title={renderHeaderItem(item)}>
            <Row className={'card-description'}>{item.description}</Row>
          </Card>
        </Link>
      </List.Item>
    );
  };

  return (
    <AppLayout isShowSearch>
      <Row className={'wrapper-home'}>
        <Row className={'home-page'}>
          <Row className={'header'}>
            <Col className={'title-header'}>{t('yourBoard')}</Col>
            <Button
              className={'btn-add-new'}
              size={'large'}
              onClick={() => setDataModal({ visible: true, board: undefined })}>
              <PlusOutlined />
              {t('addNewBoard')}
            </Button>
          </Row>
          {isLoading ? (
            <Skeleton />
          ) : (
            <List
              dataSource={listBoard?.data || []}
              itemLayout={'horizontal'}
              style={{ marginTop: 20, flex: 1 }}
              rowKey={item => item.id.toString()}
              grid={{ gutter: 16, column: 4 }}
              renderItem={renderItem}
              split
            />
          )}
          <AddNewBoard dataModal={dataModal} setDataModal={setDataModal} />
        </Row>
      </Row>
    </AppLayout>
  );
};

export default Home;

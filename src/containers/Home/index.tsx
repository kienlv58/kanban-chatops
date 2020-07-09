import React, { ReactNode, useEffect, useState } from 'react';
import { List, Card, Row, Col, Button, Dropdown, Menu, Skeleton } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.scss';
import AppLayout from '../../components/AppLayout';
import AddNewBoard from './AddNewColumn';
import useFetchBoard from './useFetchBoard';
import { selectListBoard } from './homeSildeData';

const Home = () => {
  const { isLoading, fetchListBoard, deleteBoard } = useFetchBoard();
  const listBoard = useSelector(selectListBoard);
  const [dataModal, setDataModal] = useState<DataModal>({ visible: false });

  useEffect(() => {
    fetchListBoard();
  }, []);

  const { t } = useTranslation();

  const menu = (item: Board) => (
    <Menu
      className={'dropdown-menu'}
      onClick={(param: ClickParam) => {
        param.domEvent.preventDefault();
        if (param.key === '1') setDataModal({ visible: true, board: item });
        else {
          deleteBoard(item.id);
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
        <Row>{item.title}</Row>
        <Dropdown overlay={() => menu(item)} trigger={['click']} placement={'bottomRight'}>
          <MoreOutlined className={'icon-more'} />
        </Dropdown>
      </Row>
    );
  };

  const renderItem = (item: Board): ReactNode => {
    return (
      <List.Item className={'board-item'}>
        <Link to={`/board/${item.id}`}>
          <Card title={renderHeaderItem(item)}>
            <Row className={'card-description'}>{item.description}</Row>
          </Card>
        </Link>
      </List.Item>
    );
  };

  return (
    <AppLayout>
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
    </AppLayout>
  );
};

export default Home;

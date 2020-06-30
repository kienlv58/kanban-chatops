import React, { ReactNode } from 'react';
import { List, Card, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles.scss';
import AppLayout from '../../components/AppLayout';

interface Board {
  id: number;
  title: string;
  lastUpdate: string;
  description: string;
}

const boards: Board[] = [
  {
    id: 1,
    title: ' Board1',
    lastUpdate: '20/10/2020',
    description: 'This is project for customer in Japan. This company have 2 office in VietNam.',
  },
  {
    id: 2,
    title: ' Board2',
    lastUpdate: '20/10/2020',
    description:
      'This is project for customer in Japan. This company have 2 office in VietNam. The first in HaNoi city and the second in DaNang city',
  },
  {
    id: 3,
    title: ' Board3',
    lastUpdate: '20/10/2020',
    description:
      'This is project for customer in Japan. This company have 2 office in VietNam. The first in HaNoi city and the second in DaNang city',
  },
  {
    id: 4,
    title: ' Board4',
    lastUpdate: '20/10/2020',
    description:
      'This is project for customer in Japan. This company have 2 office in VietNam. The first in HaNoi city and the second in DaNang city',
  },
  {
    id: 5,
    title: ' Board5',
    lastUpdate: '20/10/2020',
    description:
      'This is project for customer in Japan. This company have 2 office in VietNam. The first in HaNoi city and the second in DaNang city. Founded from 2004',
  },
];

const Home = () => {
  const { t } = useTranslation();
  const renderItem = (item: Board): ReactNode => {
    return (
      <List.Item className={'board-item'}>
        <Link to={`/board/${item.id}`}>
          <Card title={item.title}>
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
          <Button size={'large'}>
            <PlusOutlined />
            {t('addNewBoard')}
          </Button>
        </Row>
        <List
          dataSource={boards}
          itemLayout={'horizontal'}
          style={{ marginTop: 20 }}
          rowKey={item => item.id.toString()}
          grid={{ gutter: 16, column: 4 }}
          renderItem={renderItem}
          split
        />
      </Row>

      {/*this is Home page*/}
      {/*<ul>*/}
      {/*  <li>*/}
      {/*    <Link to="/">Home</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/about">About</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/user">User</Link>*/}
      {/*  </li>*/}
      {/*</ul>*/}
      {/*<DatePicker />*/}
      {/*<br />*/}
      {/*<Button type={'primary'}>button antd</Button>*/}
      {/*<div className={'test'}>dasdsd</div>*/}
    </AppLayout>
  );
};

export default Home;

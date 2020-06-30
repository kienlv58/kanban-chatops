import React, { ReactNode } from 'react';
import { Layout, Avatar, Row, Dropdown, Menu, Col } from 'antd';
import { UserOutlined, CloseOutlined, LoginOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const { Header, Content, Footer } = Layout;

interface Props {
  children: ReactNode;
}

const AppLayout = (props: Props) => {
  const { t } = useTranslation();

  const menu = (
    <Menu className={'dropdown-avatar'}>
      <Menu.Item key="1">
        <Row className={'user-name'}>
          <Col className={'display-name'}>
            <UserOutlined className={'user-icon'} />
            <span>Kienlv</span>
          </Col>
          <CloseOutlined />
        </Row>
      </Menu.Item>
      <Menu.Item key="2" icon={<LoginOutlined />}>
        {t('signOut')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className={'app-layout'}>
      <Header>
        <Row className={'header-name'}>{t('appName')}</Row>
        <Dropdown overlay={menu} trigger={['click']} className={'abc'}>
          <Avatar
            size="large"
            className={'avatar-user'}
            gap={1}
            icon={<UserOutlined />}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Dropdown>
      </Header>
      <Content>{props.children}</Content>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default AppLayout;

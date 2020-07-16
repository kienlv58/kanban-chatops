import React, { ReactNode } from 'react';
import { Layout, Avatar, Row, Dropdown, Menu, Col, Input } from 'antd';
import { UserOutlined, CloseOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import './styles.scss';

const { Header, Content } = Layout;
const { Search } = Input;

interface Props {
  children: ReactNode;
  title?: string;
  isShowSearch?: boolean;
}

const AppLayout = (props: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title || process.env.REACT_APP_NAME}</title>
        <meta name="description" content="KanBan ChatOps application" />
      </Helmet>
      <Header>
        <Row>
          <HomeOutlined className={'icon-home'} onClick={() => history.push('/')} />
          <Search
            placeholder="input search text"
            className={'search'}
            size={'small'}
            style={{ visibility: props.isShowSearch ? 'visible' : 'hidden' }}
            // onSearch={value => console.log(value)}
          />
        </Row>
        <Row className={'header-name'}>
          <img
            src={require('src/components/AppLayout/Logo.png')}
            className={'nav-home'}
            style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: 'white', marginRight: 5 }}
            onClick={() => history.push('/')}
          />
          <Row onClick={() => history.push('/')} className={'nav-home'}>
            {t('appName')}
          </Row>
        </Row>
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
      {/*<Footer>footer</Footer>*/}
    </Layout>
  );
};

export default AppLayout;

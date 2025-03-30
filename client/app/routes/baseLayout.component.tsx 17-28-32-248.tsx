import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router';
import { UserOutlined } from '@ant-design/icons/lib/icons';
import Hotels from './hotels.component';
import favicon from '../../public/favicon.ico';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 'logo',
    label: 'logo',
    // img: favicon,

  },

  {
    key: '/hotels',
    label: <Link to="/">HEXLING</Link>,

  },

  {
    key: 'heme',
    label: 'Theme',

  },
  {
    key: '/profile',
    label: 'Profile',
    icon: <UserOutlined />,

  },
];

const BaseLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Header>
      <Content />
      <Outlet />
      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      />
      <Footer style={{ textAlign: 'center' }}>
        HEXLING ©{new Date().getFullYear()} Created by students of Hexlet
      </Footer>
    </Layout>
  );
};

export default BaseLayout;

import { useState } from 'react';

import {
  Avatar, ConfigProvider, Layout, Menu, Switch, theme, Space, Flex,
  Modal,
} from 'antd';
import type { MenuTheme } from 'antd';
import { MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { BrowserRouter, Link, Outlet, Route } from 'react-router-dom';
// import AuthProvider from '../authContext.js';
import Profile from './profile.js';

const { Header, Content, Footer } = Layout;

const leftItems = [
  {
    key: '/hotels',
    label: (
      <Link to="/">
        <Space>
          <Avatar src="/booking.png" />HEXLING
        </Space>
      </Link>),
  },
];
// <Button type="primary" onClick={showModal}>
// Open Modal
// </Button>
const rightItems = [
  {
    label: 'Профиль',
    key: 'profileMenu',
    icon: <UserOutlined />,
    children: [
      {
        key: '/profile',
        label: <Link to="/profile">Профиль</Link>,
        // onclick: showModal,
      },
      {
        key: 'bid',
        label: <Link to="/auth">Мои Бронирования</Link>,
      },
      {
        key: 'exit',
        label: <Link to="/hotel">Выход</Link>,
      },
    ],
  },
];

const BaseLayout: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>('dark');
  const changeTheme = (isNewThemeDark: boolean) => {
    setCurrentTheme(isNewThemeDark ? 'dark' : 'light');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Layout>
            <Header>
              <Flex justify="space-between">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  items={leftItems}
                />
                <Flex align="center">
                  <Switch
                    checked={currentTheme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                  />
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    items={rightItems}
                  />
                </Flex>
              </Flex>
            </Header>

            <Content style={{ padding: 48 }}>
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Route path="/" element={<Profile />} />
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              HEXLING © {new Date().getFullYear()} Created by students of Hexlet
            </Footer>
          </Layout>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </ConfigProvider>
  );
};

export default BaseLayout;

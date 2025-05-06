import { useState } from 'react';

import {
  Avatar, ConfigProvider, Layout, Menu, Switch, theme, Space, Flex,
} from 'antd';
import type { MenuTheme } from 'antd';
import { MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import {
  Link, Outlet,
} from 'react-router-dom';
import AuthProvider from '../authContext.js';
// import Profile from './profile.js';

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
        label: <Link to="/bookings">Мои Бронирования</Link>,
      },
      {
        key: 'exit',
        label: <Link to="/signin">Выход</Link>,
      },
    ],
  },
];

const BaseLayout: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>('dark');
  const changeTheme = (isNewThemeDark: boolean) => {
    setCurrentTheme(isNewThemeDark ? 'dark' : 'light');
  };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
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
            {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button> */}
            {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Routes>
                <Route path="/" element={<Profile />} />
              </Routes>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal> */}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            HEXLING © {new Date().getFullYear()} Created by students of Hexlet
          </Footer>
        </Layout>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default BaseLayout;

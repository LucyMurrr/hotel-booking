import { useState } from 'react';

import {
  Avatar, ConfigProvider, Layout, Menu, Switch, theme, Space, Flex,
} from 'antd';
import type { MenuTheme } from 'antd';

import { MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { Link, Outlet } from 'react-router-dom';

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

  return (
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
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          HEXLING © {new Date().getFullYear()} Created by students of Hexlet
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;

import { useState, useCallback } from 'react';
import {
  Avatar, ConfigProvider, Layout, Switch, theme, Flex, Dropdown, Button,
} from 'antd';
import type { MenuProps, MenuTheme } from 'antd';
import { MoonOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

const { Header, Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>('dark');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const changeTheme = (isNewThemeDark: boolean) => {
    setCurrentTheme(isNewThemeDark ? 'dark' : 'light');
  };

  const handleLogout = useCallback(() => {
    logout();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate('/signin');
  }, [logout, navigate]);

  const profileMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link to="/profile">Профиль</Link>,
    },
    {
      key: 'bookings',
      label: <Link to="/bookings">Мои бронирования</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <Link to="/" onClick={handleLogout}>Выход</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Layout: {
            headerBg: currentTheme === 'dark' ? '#141414' : '#001529',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0 24px' }}>
          <Flex justify="space-between" align="center">
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src="/logo.png" />
              <span style={{ color: 'white', marginLeft: 8, fontSize: 18 }}>HEXLING</span>
            </Link>

            <Flex align="center" gap={16}>
              <Switch
                checked={currentTheme === 'dark'}
                onChange={changeTheme}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                aria-label="Переключить тему"
              />

              {isAuthenticated ? (
                <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
                  <Button
                    type="text"
                    style={{ color: 'white' }}
                    icon={<UserOutlined />}
                  >
                    Профиль
                  </Button>
                </Dropdown>
              ) : (
                <Button type="primary" onClick={() => navigate('/signin')}>
                  Войти
                </Button>
              )}
            </Flex>
          </Flex>
        </Header>

        <Content style={{ padding: '24px 48px', flex: 1 }}>
          <main>
            <Outlet />
          </main>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          HEXLING © {new Date().getFullYear()} Created by students of Hexlet
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;

import { useState } from 'react';

import {
  Avatar, Col, ConfigProvider, Layout, Menu, Row, Switch, theme,
} from 'antd';
import type { MenuTheme } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons/lib/icons';
import Hotel from './hotel.component';
import AuthForm from './authorisation.form';
import Profile from './profile.component';
import Hotels from './hotels.component';

// import HotelCard from './hotelCard.component';

const { Header, Content, Footer } = Layout;

const leftItems = [
  {
    key: '/hotels',
    label: <Link to="/">HEXLING</Link>,

  },
];

const rightItems = [
  {
    label: 'Profile',
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
        label: <Link to="/hotel">Выход</Link>, // 'Выход',

      },
    ],
  },
];

const BaseLayout: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<MenuTheme>('dark');
  const changeTheme = (value: boolean) => {
    setCurrentTheme(value ? 'dark' : 'light');
  };

  return (

    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'light' ? theme.compactAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Row align="middle" style={{ width: '100%' }}>
            <Col span={(12)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Avatar src="../../public/booking.png" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  items={leftItems}
                  style={{ flex: '1', display: 'flex', justifyContent: '' }}
                />
              </div>
            </Col>
            {/* <Col span={(2)}>
                        <Menu
                            theme='dark'
                            mode="horizontal"
                            items={leftItems}
                            style={{ flex: '1', display: 'flex', justifyContent: '' }}
                        />
                    </Col>  */}
            <Col span={(5)}>
              <div />
            </Col>
            <Col span={(7)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <Switch
                  checked={currentTheme === 'dark'}
                  onChange={changeTheme}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  items={rightItems}
                  style={{ flex: '1', display: 'flex', textAlign: 'right' }}
                />
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{ padding: '0 48px' }}
        >
          <div
            style={{
              minHeight: 600,
              padding: 24,
            }}
          >
            <Routes>

              <Route path="/" element={<Hotels />} />
              <Route path="/hotels/hotel" element={<Hotel />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/profile" element={<Profile />} />

            </Routes>
          </div>

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          HEXLING ©{new Date().getFullYear()} Created by students of Hexlet
        </Footer>
      </Layout>
    </ConfigProvider>
  // </Router>

  );
};

export default BaseLayout;

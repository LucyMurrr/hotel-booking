import React, { useState } from 'react';
// import './index.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [

    {
        key: '/hotels',
        label: 'logo',
        // img: favicon,
    },
    {
        key: '/',
        label: 'HEXLING',
        
    },
    {
        key: '/hotels/1',
        label: 'Theme',
       
    },
    {
        label: 'Profile',
        key: 'profileMenu',
        icon: <UserOutlined />,
        children: [
            {
                key: '/profile',
                label: 'Настройка профиля',
            },
            {
                key: 'bid',
                label: 'Мои Бронирования',
            
            },
            {
                key: 'exit',
                label: 'Выход',
            
            },
        ],
    },
];

const AppHeader: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default AppHeader;

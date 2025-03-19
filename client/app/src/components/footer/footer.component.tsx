import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {

  return (
    <Footer style={{ textAlign: 'center' }}>
        HEXLING ©{new Date().getFullYear()} Created by students of Hexlet
    </Footer>
      );
};
    
export default AppFooter ;

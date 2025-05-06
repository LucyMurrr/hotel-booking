import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Card, Typography, Alert, Tabs,
} from 'antd';
import client from '@api';
import type { UserCreateDto, TokensCreateRequest, UsersCreateRequest } from '@api';

const { TabPane } = Tabs;
const { Title } = Typography;

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: UserCreateDto | TokensCreateRequest) => {
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const userCreateRequest = {
          userCreateDto: values,
        };
        await client.usersCreate(userCreateRequest as UsersCreateRequest);
        setMode('login');
      }
      const tokensCreateRequest = {
        authInfo: values,
      };

      const { token } = await client.tokensCreate(tokensCreateRequest as TokensCreateRequest);
      localStorage.setItem('token', token);
      await navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка запроса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '40px auto',
      padding: 24,
    }}
    >
      <Card>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          {mode === 'register' ? 'Регистрация' : 'Вход'}
        </Title>

        <Tabs
          activeKey={mode}
          onChange={(key) => setMode(key as typeof mode)}
          centered
        >
          <TabPane tab="Вход" key="login" />
          <TabPane tab="Регистрация" key="register" />
        </Tabs>

        {error && <Alert message={error} type="error" style={{ marginBottom: 24 }} />}

        <Form<UserCreateDto | TokensCreateRequest>
          layout="vertical"
          onFinish={handleSubmit}
        >
          {mode === 'register' && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Введите имя' }]}
            >
              <Input placeholder="Имя" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Введите email' },
              { type: 'email', message: 'Некорректный email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 8, message: 'Минимум 8 символов' },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AuthPage;

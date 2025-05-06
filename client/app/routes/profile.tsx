import {
  Card, Form, Input, Button,
} from 'antd';
import client from '@api';
import type { Route } from './+types/profile';

export async function clientLoader() {
  const userId = 1;
  return await client.usersGet({ userId });
}

const ProfilePage = ({ loaderData }: Route.ComponentProps) => {
  const [form] = Form.useForm();

  const user = loaderData;

  // eslint-disable-next-line @typescript-eslint/require-await
  const handleSubmit = async (values: unknown) => {
    // await client.usersUpdateMe(values);
    console.log(values);
  };

  return (
    <Card title="Личные данные" style={{ maxWidth: 600 }}>
      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email' }]}
        >
          <Input disabled />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
      </Form>
    </Card>
  );
};

export default ProfilePage;

import { useState } from 'react';
import {
  FloatButton, Drawer, List, Input, Button, Avatar, Typography, Space,
} from 'antd';
import { MessageOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Добрый день! Чем могу помочь?', sender: 'support', timestamp: new Date() },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <>
      {/* Плавающая кнопка */}
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24, width: 56, height: 56 }}
        onClick={() => setOpen(true)}
      />

      {/* Выдвижная панель чата */}
      <Drawer
        title={(
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar
              size="small"
              icon={<MessageOutlined />}
              style={{ backgroundColor: '#1890ff' }}
            />
            <Text strong>Чат с поддержкой</Text>
          </div>
        )}
        placement="right"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        width={400}
        styles={{ header: { padding: '12px 24px' } }}
        extra={(
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
          />
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* История сообщений */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
            <List
              dataSource={messages}
              renderItem={(msg) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      background: msg.sender === 'user' ? '#1890ff' : '#f0f0f0',
                      color: msg.sender === 'user' ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                      padding: '8px 12px',
                      borderRadius: 8,
                      maxWidth: '80%',
                    }}
                  >
                    {msg.text}
                    <div
                      style={{
                        fontSize: 12,
                        color: msg.sender === 'user' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.45)',
                        marginTop: 4,
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Поле ввода */}
          <Space.Compact>
            <Input
              placeholder="Введите сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              style={{ width: 'calc(100% - 60px)' }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              style={{ width: 60 }}
            />
          </Space.Compact>
        </div>
      </Drawer>
    </>
  );
};

export default ChatWidget;

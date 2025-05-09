import { useEffect, useState } from 'react';
import {
  FloatButton, Drawer, List, Input, Button, Avatar, Typography, Space,
} from 'antd';
import { MessageOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import { useAuth } from '~/authContext';

const { Text } = Typography;

interface APIMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string; // ISO строка
}

// Тип для локального сообщения в состоянии
interface UIMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Добрый день! Чем могу помочь?', sender: 'support', timestamp: new Date() },
  ]);
  const { user } = useAuth();

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onmessage = (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, max-len
      const newMessage = JSON.parse(event.data as string) as { text: string, sender: string, timestamp: Date };
      setMessages((prev) => [...prev, newMessage]);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/messages', {
          headers: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Ошибка загрузки истории');

        const data = await response.json() as APIMessage[];

        if (!user) return;

        // Конвертация API формата в UI формат
        const convertedMessages: UIMessage[] = data.map((msg) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === String(user.id) ? 'user' : 'support',
          timestamp: new Date(msg.createdAt),
        }));

        setMessages(convertedMessages);
      } catch (error) {
        console.error('Ошибка:', error);
        // Здесь можно добавить уведомление для пользователя
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchHistory();
  }, [user]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (ws && message.trim() && user) {
      ws.send(JSON.stringify({
        senderId: user.id,
        receiverId: 5,
        content: message,
      }));
    }

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

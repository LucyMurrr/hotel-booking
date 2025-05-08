import { useState } from 'react';
import {
  List, Avatar, Card, Typography, Row, Col, Input, Button, Space,
} from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      client: 'Клиент 1',
      lastMessage: 'Привет!',
      unread: 2,
      messages: [
        { id: 1, text: 'Привет!', sender: 'client', timestamp: '2024-01-01T10:00:00' },
        // eslint-disable-next-line max-len
        { id: 2, text: 'Здравствуйте! Чем могу помочь?', sender: 'manager', timestamp: '2024-01-01T10:01:00' },
      ],
    },
    {
      id: 2,
      client: 'Клиент 2',
      lastMessage: 'Нужна помощь с бронированием',
      unread: 0,
      messages: [
        { id: 1, text: 'Нужна помощь с бронированием', sender: 'client', timestamp: '2024-01-01T11:00:00' },
      ],
    },
  ]);

  const handleSendMessage = () => {
    if (!selectedChatId || !messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'manager',
      timestamp: new Date().toISOString(),
    };

    setChats((prev) => prev.map((chat) => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage.text,
          unread: 0,
        };
      }
      return chat;
    }));

    setMessageInput('');
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <Card styles={{ body: { padding: 0 } }}>
      <Row style={{ height: '70vh' }}>
        {/* Список чатов */}
        <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }}>
          <List
            dataSource={chats}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedChatId(item.id)}
                style={{
                  cursor: 'pointer',
                  background: selectedChatId === item.id ? '#595959' : undefined,
                  padding: '12px 24px',
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.client}
                  description={(
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text ellipsis style={{ maxWidth: '70%' }}>{item.lastMessage}</Text>
                      {item.unread > 0 && (
                        <span style={{
                          background: '#ff4d4f',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px 6px',
                          fontSize: 12,
                        }}
                        >
                          {item.unread}
                        </span>
                      )}
                    </div>
                  )}
                />
              </List.Item>
            )}
          />
        </Col>

        {/* Окно чата */}
        <Col span={16}>
          {selectedChat ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Заголовок чата */}
              <div style={{
                padding: 16,
                borderBottom: '1px solid #f0f0f0',
              }}
              >
                <Text strong>{selectedChat.client}</Text>
              </div>

              {/* Сообщения */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 220px)',
                maxHeight: 'calc(100vh - 220px)',
                position: 'relative',
              }}
              >
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  bottom: 10,
                  overflowY: 'auto',
                  paddingRight: 8,
                }}
                >
                  {selectedChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'manager' ? 'flex-end' : 'flex-start',
                        marginBottom: 8,
                        flexShrink: 0,
                        minHeight: 42,
                      }}
                    >
                      <div style={{
                        background: msg.sender === 'manager' ? '#1890ff' : '#fff',
                        color: msg.sender === 'manager' ? '#fff' : 'rgba(0, 0, 0, 0.85)',
                        padding: '8px 12px',
                        borderRadius: 8,
                        maxWidth: '70%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                        overflowWrap: 'anywhere',
                      }}
                      >
                        {msg.text}
                        <div style={{
                          fontSize: 12,
                          color: msg.sender === 'manager' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.45)',
                          marginTop: 4,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Поле ввода */}
              <div style={{
                padding: 16,
                borderTop: '1px solid #f0f0f0',
              }}
              >
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Введите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
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
            </div>
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(0,0,0,0.45)',
            }}
            >
              <Text>Выберите чат</Text>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default ChatPage;

import { useState } from 'react';
import client from '@api';
import {
  Rate, Image, Row, Col, Card, Typography, Tag, Space, Divider, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import type { Route } from './+types/hotel';

const { Title, Text } = Typography;

const getRatingColor = (rating: number) => {
  if (rating >= 8) return '#52c41a';
  if (rating >= 6) return '#faad14';
  return '#ff4d4f';
};

export async function clientLoader({ params }: Route.LoaderArgs) {
  const hotelId = Number(params.hotelId);
  const userId = 4; // В реальном приложении брать из авторизации

  const [hotelData, roomsData, favoritesData] = await Promise.all([
    client.hotelsGet({ hotelId }),
    client.hotelRoomsList({ hotelId }),
    client.listUserFavorites({ userId }),
  ]);

  const isFavorite = favoritesData.data.some((fav) => fav.id === hotelId);

  return {
    hotel: { ...hotelData, isFavorite },
    rooms: roomsData.data,
  };
}

const HotelPage = ({ loaderData }: Route.ComponentProps) => {
  const { hotel, rooms } = loaderData;
  const [currentHotel, setCurrentHotel] = useState(hotel);

  const toggleFavorite = async () => {
    try {
      if (currentHotel.isFavorite) {
        await client.deleteFavorite({ hotelId: currentHotel.id });
      } else {
        await client.createFavorite({ favoriteCreateDto: { hotelId: currentHotel.id } });
      }
      setCurrentHotel((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    } catch (err) {
      console.error('Ошибка при обновлении избранного:', err);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      {/* Hotel Info Section */}
      <Row gutter={24} align="middle">
        <Col flex="200px">
          <Image
            width={200}
            height={200}
            style={{ borderRadius: 8 }}
            // eslint-disable-next-line max-len
            src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
            preview={false}
          />
        </Col>

        <Col flex="auto">
          <div style={{ position: 'relative' }}>
            <Button
              type="text"
              onClick={toggleFavorite}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 4,
                height: 'auto',
              }}
              aria-label={currentHotel.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {currentHotel.isFavorite ? (
                <HeartFilled style={{ fontSize: 26, color: 'red' }} />
              ) : (
                <HeartOutlined style={{ fontSize: 26, color: '#bfbfbf' }} />
              )}
            </Button>

            <Title level={2} style={{ marginBottom: 8, paddingRight: 40 }}>
              {currentHotel.name}
            </Title>

            <Space size="middle" style={{ marginBottom: 16 }}>
              <div>
                <Text strong>Рейтинг:</Text>
                <Tag
                  color={getRatingColor(currentHotel.rating)}
                  style={{ fontSize: 16, padding: '4px 8px', marginLeft: 8 }}
                >
                  {currentHotel.rating.toFixed(1)}
                </Tag>
              </div>

              <div>
                <Text strong>Звёзды:</Text>
                <Rate
                  disabled
                  count={5}
                  value={currentHotel.stars}
                  style={{ marginLeft: 8, fontSize: 16 }}
                />
              </div>
            </Space>

            <Typography.Paragraph type="secondary">
              {currentHotel.description}
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>

      <Divider />

      <Title level={3} style={{ marginBottom: 24 }}>
        Доступные номера
      </Title>

      <Card styles={{ body: { padding: 0 } }}>
        {rooms.map((room) => (
          <div key={room.id} style={{ padding: 24, borderBottom: '1px solid #f0f0f0' }}>
            <Row align="middle" gutter={24}>
              <Col flex="auto">
                <Title level={5} style={{ marginBottom: 8 }}>
                  {room.name}
                </Title>

                <Typography.Paragraph
                  type="secondary"
                  ellipsis={{ rows: 2 }}
                  style={{ marginBottom: 12 }}
                >
                  {room.description}
                </Typography.Paragraph>

                <Space wrap size={[0, 8]}>
                  {room.amenities.map((amenity) => (
                    <Tag key={amenity.id}>{amenity.name}</Tag>
                  ))}
                </Space>
              </Col>

              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  ${room.price} <Text type="secondary">/ ночь</Text>
                </Title>

                <Link to={`/booking/${String(room.id)}`}>
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    icon={<ArrowRightOutlined />}
                  >
                    Забронировать
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default HotelPage;

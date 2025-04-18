import React from 'react';
import {
  Button, Card, Flex, Typography,
} from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import type { Hotel, HotelsGetHotelRequest } from '@api';
import client from '~/src/api';
import type { Route } from './+types/hotel.component';

const hotelID: number = 2;

export async function loader() {
  const request: HotelsGetHotelRequest = { hotelId: hotelID };
  const Data: Hotel = await client.hotelsGetHotel(request);
  console.log(Data);
  return Data;
}

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '83vh',
  display: 'flex',
  flexDirection: 'column',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: '50%',
};

const HotelPage: React.FC<Route.ComponentProps> = ({
  loaderData,
}) => {
  const {
    name, description, stars,
  } = loaderData;
  return (
    <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
      <Flex justify="space-between">
        <img
          alt="avatar"
          // eslint-disable-next-line max-len
          src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
          style={imgStyle}
        />
        <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
          <Typography.Title level={2}>
            {name}
          </Typography.Title>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
            {Array.from({ length: stars }, (_, index) => (
              <StarOutlined key={index} style={{ color: 'hotpink' }} />
            ))}
          </div>
          <Typography.Title level={5}>
            {description}
          </Typography.Title>
          <Link to="/hotelsTab" key="boking-date">
            <Button>
              Выбрать дату
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
};

export default HotelPage;

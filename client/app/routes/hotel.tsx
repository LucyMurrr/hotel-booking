import React, { useRef } from 'react';
import {
  Button, Card, Space, Tag, Typography,
} from 'antd';
import { HeartTwoTone, StarTwoTone } from '@ant-design/icons';
import { Link } from 'react-router';
import type { Hotel, HotelsGetRequest } from '@api';
import client from '~/src/api';
import type { Route } from './+types/hotel';
import RoomsTable from '../src/components/roomsTab.component';

export async function loader({ params }: Route.LoaderArgs) {
  const request: HotelsGetRequest = { hotelId: Number(params.hotelId) };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const Data: Hotel = await client.hotelsGet(request);
  // console.log(Data);
  return Data;
}

const cardStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const HotelPage: React.FC<Route.ComponentProps> = ({
  loaderData,
}) => {
  const {
    id, name, description, stars, rating,
  } = loaderData;
  // eslint-disable-next-line no-nested-ternary
  const ratingColor = rating <= 5 ? '#B22222' : rating >= 8 ? '#008000' : '#FFD700';
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollToElement = (event: React.MouseEvent) => {
    event.preventDefault();
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <Card hoverable style={cardStyle}>
      <Space style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: stars }, (_, index) => (
              <StarTwoTone key={index} twoToneColor="#eb2f96" />
            ))}
          </div>
          <Typography.Title level={2} style={{ margin: '0 0 8px 0' }}>
            {name}
          </Typography.Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HeartTwoTone style={{ fontSize: '24px', marginRight: '16px' }} />
          <Link to="/hotelsTab" key="booking-date">
            <Button onClick={scrollToElement}>
              Забронировать
            </Button>
          </Link>
        </div>
      </Space>

      <div className="flex gap-4 justify-between h-full mt-5">
        <img
          alt="Hotel"
          // eslint-disable-next-line max-len
          src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
          style={{
            width: '50%',
            height: 'auto',
            display: 'block',
          }}
        />
        <div style={{ display: 'flex' }}>
          <Typography.Title level={5}>Оценка пользователей </Typography.Title>
          <Tag
            bordered={false}
            color={ratingColor}
            style={{ alignSelf: 'flex-start', marginLeft: '8px' }}
          >
            {rating}
          </Tag>
        </div>
      </div>
      <div className="mt-10">
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
        <Typography.Title level={5}>
          {description}
        </Typography.Title>
      </div>
      <Typography.Title level={4}>
        Выберите номер:
      </Typography.Title>
      <div ref={targetRef}>
        <RoomsTable hotelId={Number(id)} />
      </div>
    </Card>
  );
};

export default HotelPage;

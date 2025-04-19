import React from 'react';
import { CalendarOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const cardStyle: React.CSSProperties = {
  width: 350,
};

type HotelCardProps = {
  key: number;
  name: string;
  // stars: number;
  description: string;
  // rating: number;
};

const HotelCard: React.FC<HotelCardProps> = ({ key, name, description }) => (
  <Card
    key={key}
    hoverable
    style={cardStyle}
    styles={{ body: { padding: 0, overflow: 'hidden' } }}
    // style={{ width: 300 }}
    cover={(
      <img
        alt="example"
        // eslint-disable-next-line max-len
        src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
      />
    )}
    actions={[
      <Link to="/hotelC" key="information">
        <FullscreenOutlined />
      </Link>,
      <Link to="/hotels/:hotelName/rooms" key="boking-date">
        <CalendarOutlined key="date" />
      </Link>,
      <Link to="/auth" key="boking-date">
        <ShoppingCartOutlined key="booking" />
      </Link>,
    ]}
  >
    <Meta
      avatar={<Avatar src="../public/booking.png" />}
      title={name}
      description={description}
      // stars={stars}
      // rating={rating}
    />
  </Card>
);

export default HotelCard;

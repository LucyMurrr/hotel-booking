import React, { type ReactNode } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { FullscreenOutlined, ShoppingCartOutlined, CommentOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface HotelCardProps {
  id: number,
  name: string;
  stars: number;
  description: ReactNode;
  rating: number;
}

interface InnerCardProps {
  name: string;
  stars: string;
  description: ReactNode;
  rating: number;
}

const cardWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  overflow: 'auto',
};

const imageStyle: React.CSSProperties = {
  flex: '0 0 auto',
  width: '35%',
  height: 'auto',
  marginRight: '3px',
};

const descriptionStyle: React.CSSProperties = {
  flex: '1',
  marginLeft: '15px',
};

const actionStyle: React.CSSProperties = {
  marginTop: '16px',
  justifyContent: 'flex-end',
  display: 'flex',
};

const InnerCard: React.FC<InnerCardProps> = ({
  name, stars, description, rating,
}) => {
  // eslint-disable-next-line no-nested-ternary
  const ratingColor = rating <= 5 ? '#B22222' : rating >= 8 ? '#008000' : '#FFD700';
  return (
    <div style={{ ...cardWrapperStyle }}>
      <Card
        type="inner"
        variant="borderless"
        title={<h1 style={{ color: '#FFD700' }}>{name}</h1>}
        extra={stars}
        // style={{ borderRadius: 0 }}
        style={{ width: '100%' }}
      >
        <Meta
          // avatar={<Avatar src="../public/booking.png" />}
          // eslint-disable-next-line max-len
          title={<h3>Рейтинг:  <span style={{ color: ratingColor }}>{rating}</span></h3>}
          description={description}
        />
      </Card>
    </div>
  );
};

const HotelCard: React.FC<HotelCardProps> = ({
  id, name, stars, description, rating,
}) => {
  const star: string = '⭐'.repeat(stars);
  console.log(id);
  return (
  // <div>
    <Card
      type="inner"
      hoverable
      style={{ width: '100%' }}
    >
      <div style={cardWrapperStyle}>
        {/* <Space direction="horizontal" size="middle" style={{ display: 'flex', height: '100%' }}> */}
        <img
          alt="example"
            // eslint-disable-next-line max-len
          src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
          style={imageStyle}
        />
        <div style={descriptionStyle}>
          <InnerCard name={name} stars={star} description={description} rating={rating} />
          <div style={{ ...actionStyle, display: 'flex' }}>
            <Link to={`hotels/${String(id)}`}>
              <FullscreenOutlined /> Информация
            </Link>
            <Link to="/hotels/:hotelName/rooms" style={{ marginLeft: '30px' }}>
              <CommentOutlined /> Отзывы
            </Link>
            <Link to="/auth" style={{ marginLeft: '30px' }}>
              <ShoppingCartOutlined /> Бронирование
            </Link>
          </div>
        </div>
        {/* </Space> */}
      </div>
    </Card>
  // </div>
  );
};

export default HotelCard;

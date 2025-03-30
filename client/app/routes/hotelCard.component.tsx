// export default function Hotel() {
//     return (
//         <>
//             <h1>HOTEL</h1>
//         </>
//     )
// }

import React from 'react';
import { CalendarOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const cardStyle: React.CSSProperties = {
  width: 350,
};

const HotelCard: React.FC = () => (
  <Card
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
      <Link to="/hotels/hotel" key="information">
        <FullscreenOutlined />
      </Link>,
      <CalendarOutlined key="date" />,
      <ShoppingCartOutlined key="booking" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="../public/booking.png" />}
      title="Hotel name"
      description="This is the hotel description"
    />
  </Card>
);

export default HotelCard;

import React from 'react';
import {
  Button, Card, Flex, Typography,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StarOutlined } from '@ant-design/icons';
// import ImgCarousel from './carousel.component';

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

const Hotel: React.FC = () => (
  <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
    {/* <ImgCarousel /> */}
    <Flex justify="space-between">
      <img
        alt="avatar"
        // eslint-disable-next-line max-len
        src="https://avatars.mds.yandex.net/i?id=3a4b25811801d377b6df70980e7c1591_l-8342740-images-thumbs&ref=rim&n=13&w=1920&h=1080"
        style={imgStyle}
      />
      {/* <ImgCarousel /> */}
      <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
        <Typography.Title level={2}>
          Название отеля.
        </Typography.Title>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
        >
          <StarOutlined style={{ color: 'hotpink' }} />
          <StarOutlined style={{ color: 'hotpink' }} />
          <StarOutlined style={{ color: 'hotpink' }} />
          <StarOutlined style={{ color: 'hotpink' }} />
          <StarOutlined style={{ color: 'hotpink' }} />
        </div>
        <Typography.Title level={5}>
          Здесь очень информативное описание отеля.
          Расположение.
          Удобства.
          Условия размещения.
          И т.д.
        </Typography.Title>
        <Button type="primary" href="https://ant.design" target="_blank">
          Выбрать дату
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export default Hotel;

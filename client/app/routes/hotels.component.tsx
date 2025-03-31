import React from 'react';
import { Flex } from 'antd';
import HotelCard from '../src/components/hotelCard.component';

const Hotels: React.FC = () => (
  <Flex wrap gap="large">
    {Array.from({ length: 24 }, () => (
      <HotelCard />
    ))}
  </Flex>
);
export default Hotels;

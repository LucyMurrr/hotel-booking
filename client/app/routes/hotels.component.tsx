import React from 'react';
import { Flex } from 'antd';
import type { Hotel } from '@api';
import client from '~/src/api';
import HotelCard from '../src/components/hotelCard/hotelCard.component';

export async function loader() {
  const Data: Hotel[] = (await client.hotelsList()).data;

  console.log(111, Data);
  return Data;
}

export type HotelsProps = {
  loaderData: Hotel[];
};

const Hotels: React.FC<HotelsProps> = ({
  loaderData,
}) => {
  const {
    id, name, description,
  } = loaderData[0];
  return (
    <Flex wrap gap="large">
      {Array.from({ length: 24 }, () => (
        <HotelCard key={id} name={name} description={description} />
      ))}
    </Flex>
  );
};
export default Hotels;

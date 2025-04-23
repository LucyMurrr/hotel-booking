import React, { useState } from 'react';
import {
  Flex, Pagination, Space, type PaginationProps,
} from 'antd';
import type { Hotel } from '@api';
import client from '~/src/api';
import HotelCard from '../src/components/hotelCard/hotelCard.component';
import BaseLayoutForm from '../src/components/baseLayoutForm/baseLayoutForm.component';

export async function loader() {
  const Data: Hotel[] = (await client.hotelsListHotels()).data;

  // console.log(111, Data); // удалить
  return Data;
}

export type HotelsProps = {
  loaderData: Hotel[];
};

const Hotels: React.FC<HotelsProps> = ({
  loaderData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    setCurrentPage(current);
    setPageSize(size);
  };

  // const stars: number = 5; // костыли
  // const rating: number = 3.0; // костыли

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = loaderData.slice(startIndex, endIndex);

  return (
    <Space direction="horizontal" size="middle" style={{ display: 'flex', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BaseLayoutForm />
      </div>
      {/* <Divider type="vertical" style={{ height: '100%' }} /> */}
      <Space direction="vertical" size="middle" style={{ display: 'flex', flexGrow: 1 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={loaderData.length}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={(page) => setCurrentPage(page)}
        />
        <Flex wrap gap="large">
          {paginatedData.map((data) => (
            // eslint-disable-next-line max-len
            <HotelCard key={data.id} name={data.name} description={data.description} stars={data.stars} rating={data.rating} />
          ))}
        </Flex>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={loaderData.length}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          onChange={(page) => setCurrentPage(page)}
        />
      </Space>
    </Space>
  );
};
export default Hotels;

import React, { useState } from 'react';
import {
  Flex, Pagination, Space, Select, type PaginationProps,
} from 'antd';
import type { Hotel } from '@api';
import { Form } from 'react-router-dom';
import client from '~/src/api';
import HotelCard from '../src/components/hotelCard/hotelCard.component';
import type { Route } from '../+types/root';

export async function loader({
  params,
}: Route.LoaderArgs) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const response = await client.hotelsListRaw(params);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const data = await response.raw.json();
  console.log(111, params);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.data;
}

export type HotelsProps = {
  loaderData: Hotel[];
};

const BaseLayoutForm: React.FC = () => {
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(10);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [minStar, setMinStar] = useState<string>('2');
  const [maxStar, setMaxStar] = useState<string>('5');

  const resetFilters = () => {
    setMinRating(0);
    setMaxRating(10);
    setStartDate('');
    setEndDate('');
    setSearch('');
    setMinStar('2');
    setMaxStar('5');
  };

  return (
    <Form method="get" className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="pb-6">Отфильтровать по ...</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-500">... названию:</label>
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // eslint-disable-next-line max-len
            className="p-2 border text-gray-500 h-8 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-500">... минимальному количеству звезд:</label>
          <select
            name="minStar"
            value={minStar}
            onChange={(e) => setMinStar(e.target.value)}
            // eslint-disable-next-line max-len
            className="p-2 h-8 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
          >
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">... максимальному количеству звезд:</label>
          <select
            name="maxStar"
            value={maxStar}
            onChange={(e) => setMaxStar(e.target.value)}
            // eslint-disable-next-line max-len
            className="p-2 h-8 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
          >
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">... рейтингу:</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={maxRating}
            onChange={(e) => setMaxRating(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />
          <div className="flex justify-between text-sm mt-1 text-gray-500">
            <input
              type="text"
              name="minRating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-1/2 p-2 h-8 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="maxRating"
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
              className="w-1/2 p-2 h-8 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">Выберите даты:</label>
          <div className="flex justify-between">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              // eslint-disable-next-line max-len
              className="p-2 h-8 bg-blue-200 text-gray-500 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
            />
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              // eslint-disable-next-line max-len
              className="p-2 h-8 border bg-blue-200 text-gray-500 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            onClick={resetFilters}
            // eslint-disable-next-line max-len
            className="border border-gray-300 text-gray-500 px-3 py-2 rounded-md transition duration-200 hover:bg-gray-200"
          >
            Отмена
          </button>
          <button
            type="submit"
            // eslint-disable-next-line max-len
            className="bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
          >
            OK
          </button>
        </div>
      </div>
    </Form>
  );
};

const SortButton: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => (
  <Select
    // autoFocus
    // className="border rounded-sm shadow-md transition duration-200 hover:bg-blue-500"
    onChange={onChange}
    placeholder="Выберите параметр"
    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
    options={[
      { value: 'nameAsc', label: 'названию по возрастанию' },
      { value: 'nameDesc', label: 'названию по убыванию' },
      { value: 'ratingAsc', label: 'рейтингу по возрастанию' },
      { value: 'ratingDesc', label: 'рейтингу по убыванию' },
      { value: 'starAsc', label: 'звезности по возрастанию' },
      { value: 'starDesc', label: 'звезности по убыванию' },
    ]}
  />
);

const Hotels: React.FC<HotelsProps> = ({
  loaderData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortedData, setSortedData] = useState(loaderData);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    setCurrentPage(current);
    setPageSize(size);
  };

  const sortHotels = (option: string) => {
    switch (option) {
      case 'nameAsc':
        return [...loaderData].sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return [...loaderData].sort((a, b) => b.name.localeCompare(a.name));
      case 'ratingAsc':
        return [...loaderData].sort((a, b) => a.rating - b.rating);
      case 'ratingDesc':
        return [...loaderData].sort((a, b) => b.rating - a.rating);
      case 'starAsc':
        return [...loaderData].sort((a, b) => a.stars - b.stars);
      case 'starDesc':
        return [...loaderData].sort((a, b) => b.stars - a.stars);
      default:
        return loaderData;
    }
  };

  const handleSortChange = (value: string) => {
    const sorted = sortHotels(value);
    setSortedData(sorted);
    setCurrentPage(1);
  };

  return (
    <Space direction="horizontal" size="middle" style={{ display: 'flex', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BaseLayoutForm />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* <Flex vertical justify="space-between" style={{ padding: 32 }}> */}
        {/* <Space direction="vertical" size="middle" style={{ display: 'flex', flexGrow: 1 }}> */}
        {/* eslint-disable-next-line max-len */}
        <Space className="border rounded-md p-2 w-2/5" style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <label className="mr-2">Сортировать по ...</label>
          <SortButton onChange={handleSortChange} />
        </Space>
        <div className="flex gap-4 flex-col justify-between h-full mt-15">
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
        </div>
        {/* </Space> */}
        {/* </Flex> */}
      </div>
    </Space>
  );
};
export default Hotels;

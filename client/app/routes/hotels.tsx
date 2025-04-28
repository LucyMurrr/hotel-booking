import React, { useState, useEffect } from 'react';
import {
  Flex, Pagination, Space, type PaginationProps,
} from 'antd';
import {
  DatePicker,
  Form as AntdForm,
} from 'antd';
import type { Hotel } from '@api';
import { Form } from 'react-router-dom';
import client from '~/src/api';
import HotelCard from '../src/components/hotelCard/hotelCard.component';
import type { Route } from '../+types/root';

const { RangePicker } = DatePicker;
// interface HotelsList200Response {
//   data: Hotel[];
// }

// interface ApiResponse {
//   raw: Response;
// }
// type FormValues = {
//   search?: string;
//   minStar?: string;
//   maxStar?: string;
//   dates?: [moment.Moment | null, moment.Moment | null];
//   rating?: number[];
// };
// async function fetchHotels(requestParameters: { name?: string; minStars?: number; maxStars?: number }) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
//   const response: ApiResponse = await client.hotelsListRaw(requestParameters);
//   return response.raw;
// }
export async function loader({
  params,
}: Route.LoaderArgs) {
  // const url = new URL(request.url);
  // const minStar = url.searchParams.get('minStar');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const response = await client.hotelsListRaw(params);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const data = await response.raw.json();
  // console.log(111, request);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.data;
}

export type HotelsProps = {
  loaderData: Hotel[];
};

// eslint-disable-next-line max-len, no-empty-pattern, react/no-unused-prop-types
const BaseLayoutForm: React.FC = () => {
  const [antdForm] = AntdForm.useForm();
  const [rating, setRating] = useState<number[]>([3, 8]);
  // const submit = useSubmit();

  useEffect(() => {
    antdForm.setFieldsValue({
      rating,
    });
  }, [antdForm, rating]);

  const handleSliderChange = (value: number[]) => {
    setRating(value);
  };

  return (
    <Form method="get" className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-500">Поиск по названию</label>
          <input
            type="text"
            name="search"
              // eslint-disable-next-line max-len
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-500">Выберите минимальное количество звезд</label>
          <select
            name="minStar"
              // eslint-disable-next-line max-len
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">Выберите максимальное количество звезд</label>
          <select
            name="maxStar"
              // eslint-disable-next-line max-len
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-500">Выберите даты</label>
          <RangePicker
              // eslint-disable-next-line max-len
            className="w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-500">Выберите рейтинг</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={rating[0]}
            onChange={(e) => handleSliderChange([e.target.valueAsNumber, rating[1]])}
              // eslint-disable-next-line max-len
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={rating[1]}
            onChange={(e) => handleSliderChange([rating[0], e.target.valueAsNumber])}
              // eslint-disable-next-line max-len
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />
          <div className="flex justify-between text-sm mt-1 text-gray-600">
            <span>{rating[0]}</span>
            <span>{rating[1]}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
              // eslint-disable-next-line max-len
            className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
          >
            Подтвердить
          </button>
          <button
            type="button"
            onClick={() => { /* Сброс фильтров */ }}
              // eslint-disable-next-line max-len
            className="border border-gray-300 text-gray-600 px-2 py-1 rounded-md transition duration-200 hover:bg-gray-200"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </Form>
  );
};

const Hotels: React.FC<HotelsProps> = ({
  loaderData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [searchParams, setsearchParams] = useState<FormValues | undefined>(undefined);

  // const handleFilterChange = (requestParameters: FormValues) => {
  //   setsearchParams(requestParameters);
  // };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    setCurrentPage(current);
    setPageSize(size);
  };

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
      {/* <p>{searchParams?.maxStar}</p>
      <p>{searchParams?.minStar}</p>
      <p>{searchParams?.rating}</p> */}
    </Space>
  );
};
export default Hotels;

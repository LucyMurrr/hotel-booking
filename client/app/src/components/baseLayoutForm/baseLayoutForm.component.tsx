import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Input,
  Select,
  Slider,
  Space,
  Form as AntdForm,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
// import { Form } from 'react-router-dom';
import type { FormProps } from 'antd';
import client from '~/src/api';

const { RangePicker } = DatePicker;

type FormValues = {
  search?: string;
  minStar?: string;
  maxStar?: string;
  dates?: [moment.Moment | null, moment.Moment | null];
  rating?: number[];
};

interface ApiResponse {
  raw: Response;
}

async function fetchHotels(requestParameters: { name?: string; minStars?: number; maxStars?: number }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const response: ApiResponse = await client.hotelsListRaw(requestParameters);
  return response.raw;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const requestParameters: {
    name?: string;
    minStars?: number | undefined;
    maxStars?: number | undefined;
  } = {
    name: formData.get('search') as string || undefined,
    minStars: formData.get('minStar') ? Number(formData.get('minStar')) : undefined,
    maxStars: formData.get('maxStar') ? Number(formData.get('maxStar')) : undefined,
  };
  return fetchHotels(requestParameters);
}

// eslint-disable-next-line max-len
const BaseLayoutForm: React.FC<{ onFilterChange: (requestParameters: FormValues) => void }> = ({ onFilterChange }: { onFilterChange: (requestParameters: FormValues) => void}) => {
  const [antdForm] = AntdForm.useForm();
  const [rating, setRating] = useState<number[]>([3, 8]);

  useEffect(() => {
    antdForm.setFieldsValue({
      rating,
    });
  }, [antdForm, rating]);

  const handleAntdSubmit: FormProps['onFinish'] = async (values: FormValues) => {
    const requestParameters = {
      name: values.search || undefined,
      minStar: values.minStar || undefined,
      maxStar: values.maxStar || undefined,
      dates: values.dates || undefined,
      rating: values.rating || rating,
    };

    try {
      onFilterChange(requestParameters);
      const rawResponse = await fetchHotels({
        name: requestParameters.name,
        minStars: requestParameters.minStar ? Number(requestParameters.minStar) : undefined,
        maxStars: requestParameters.maxStar ? Number(requestParameters.maxStar) : undefined,
      });
      if (rawResponse.ok) {
      // if (rawResponse.ok) {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        // const jsonData: Hotel[] = (await rawResponse.json()).data;
        // eslint-disable-next-line max-len
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        // console.log('Parsed Response 111:', rawResponse, jsonData);
        // return jsonData;
      } else {
        console.error('Ошибка при получении данных:', rawResponse.statusText);
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const handleSliderChange = (newRating: number[]) => {
    setRating(newRating); // Обновляем значение ползунка в состоянии
  };

  return (
    <AntdForm<FormValues>
      form={antdForm}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      style={{ minWidth: 400 }}
      onFinish={handleAntdSubmit}
    >
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <AntdForm.Item
          label="Поиск по названию"
          name="search"
          labelCol={{ span: 24 }}
        >
          <Input />
        </AntdForm.Item>
        <AntdForm.Item
          label="Выберите минимальное количество звезд"
          labelCol={{ span: 24 }}
          name="minStar"
        >
          <Select>
            <Select.Option value="2">⭐⭐</Select.Option>
            <Select.Option value="3">⭐⭐⭐</Select.Option>
            <Select.Option value="4">⭐⭐⭐⭐</Select.Option>
            <Select.Option value="5">⭐⭐⭐⭐⭐</Select.Option>
          </Select>
        </AntdForm.Item>
        <AntdForm.Item
          label="Выберите максимальное количество звезд"
          labelCol={{ span: 24 }}
          name="maxStar"
        >
          <Select>
            <Select.Option value="2">⭐⭐</Select.Option>
            <Select.Option value="3">⭐⭐⭐</Select.Option>
            <Select.Option value="4">⭐⭐⭐⭐</Select.Option>
            <Select.Option value="5">⭐⭐⭐⭐⭐</Select.Option>
          </Select>
        </AntdForm.Item>
        <AntdForm.Item
          label="Выберите даты"
          labelCol={{ span: 24 }}
          name="dates"
        >
          <RangePicker />
        </AntdForm.Item>
        <AntdForm.Item
          label="Выберите рейтинг"
          labelCol={{ span: 24 }}
          name="rating"
        >
          <Slider
            range
            value={rating}
            onChange={handleSliderChange}
            max={10}
            step={0.5}
          />
        </AntdForm.Item>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '30px',
          }}
        >
          <AntdForm.Item layout="vertical">
            <Button type="primary" htmlType="submit">
              Подтвердить
            </Button>
          </AntdForm.Item>
          <AntdForm.Item layout="vertical">
            <Button type="default" onClick={() => antdForm.resetFields()}>
              Сбросить фильтры
            </Button>
          </AntdForm.Item>
        </div>
      </Space>
    </AntdForm>
  );
};

export default BaseLayoutForm;

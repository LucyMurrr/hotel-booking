import React from 'react';
import {
  Button,
  DatePicker,
  Input,
  Select,
  Slider,
  Space,
  Form as AntdForm,
} from 'antd';
// import { useSubmit, type FormProps } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

const { RangePicker } = DatePicker;

type FormValues = {
  search?: string;
  minStar?: string;
  maxStar?: string;
  dates?: [moment.Moment | null, moment.Moment | null]; // Изменено для поддержки диапазона дат
  raiting?: number;
};

const BaseLayoutForm: React.FC = () => {
  const [antdForm] = AntdForm.useForm<FormValues>();
  // const submit = useSubmit();

  // const handleAntdSubmit: FormProps<FormValues>['onFinish'] = (values) => {
  //   const formData = new FormData();
  //   (Object.entries(values) as Array<[keyof FormValues, any]>).forEach(
  //     ([key, value]) => {
  //       formData.append(key, value);
  //     },
  //   );

  //   submit(formData, {
  //     method: 'post',
  //     action: '/',
  //   });
  // };

  return (
    <AntdForm<FormValues>
      form={antdForm}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      style={{ minWidth: 400 }}
      // onFinish={handleAntdSubmit}
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
            <Select.Option value="1">⭐⭐</Select.Option>
            <Select.Option value="2">⭐⭐⭐</Select.Option>
            <Select.Option value="3">⭐⭐⭐⭐</Select.Option>
            <Select.Option value="4">⭐⭐⭐⭐⭐</Select.Option>
          </Select>
        </AntdForm.Item>
        <AntdForm.Item
          label="Выберите максимальное количество звезд"
          labelCol={{ span: 24 }}
          name="maxStar"
        >
          <Select>
            <Select.Option value="1">⭐⭐</Select.Option>
            <Select.Option value="2">⭐⭐⭐</Select.Option>
            <Select.Option value="3">⭐⭐⭐⭐</Select.Option>
            <Select.Option value="4">⭐⭐⭐⭐⭐</Select.Option>
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
          name="raiting"
        >
          <Slider range defaultValue={[3, 8]} max={10} />
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

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Form, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import client, { type RoomDto } from '@api';

interface Amenities {
  id: number;
  name: string;
}

interface DataType {
  id: number;
  name: string;
  description: string;
  price: number;
  hotelId: number;
  amenities: Amenities[];
}
const columns = [
  // {
  //   title: 'Номер',
  //   key: 'name',
  //   dataIndex: 'name',
  // },
  {
    title: 'Номер',
    key: 'name',
    dataIndex: 'name',
    render: (text: string, item: DataType) => (
      <Link to={`rooms/${item.id.toString()}`}>{text}</Link>
    ),
  },
  {
    title: 'Стоимость',
    key: 'price',
    dataIndex: 'price',
    sorter: (a: DataType, b: DataType) => a.price - b.price,
  },

  {
    title: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Link to="/booking">Забронировать</Link>
      </Space>
    ),
  },
];

interface RoomsTableProps {
  hotelId: number;
}

const Room: React.FC<RoomsTableProps> = ({ hotelId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RoomDto[]>([]);

  async function fetchRooms(requestParameters: { hotelId: number }) {
    try {
      const response = await client.hotelRoomsList({ ...requestParameters });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка:', error.message);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
      return [];
    }
  }

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      const fetchedData = await fetchRooms({ hotelId });
      setData(fetchedData);
      setLoading(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getRooms();
  }, [hotelId]);
  const expandedRowRender = (record: DataType) => <p style={{ margin: 0 }}>{record.description}</p>;
  return (
    <>
      <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }} />
      <Table<DataType>
        bordered
        size="large"
        columns={columns}
        dataSource={data.map((item, index) => ({
          ...item,
          key: item.hotelId || index,
        }))}
        loading={loading}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
      />
    </>
  );
};

export default Room;

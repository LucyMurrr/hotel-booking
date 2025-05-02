import React, { useEffect, useState } from 'react';
import { Form, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import client, { type HotelRoomsList200Response, type RoomDto } from '@api';

// interface DataType {
//   key: number;
//   name: string;
//   date_of_building: number;
//   dist_to_airport: number;
//   star: number;
//   description: string;
//   rating: number;
// }
interface Amenities {
  id: number,
  name: string,
}

interface DataType {
  id: number;
  name: string;
  price: number;
  hotelId: number;
  amenities: Amenities[],
}

const columns = [
  {
    title: 'Номер',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Стоимость',
    key: 'minPrice',
    dataIndex: 'minPrice',
    sorter: (a: DataType, b: DataType) => a.price - b.price,
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Link to="/">Забронировать</Link>
      </Space>
    ),
  },
];

//   // eslint-disable-next-line @typescript-eslint/no-floating-promises
interface RoomsTableProps {
  hotelId: number;
}

const RoomsTable: React.FC<RoomsTableProps> = ({ hotelId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RoomDto[]>([]);

  async function fetchRooms(requestParameters: { hotelId: number }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const response = await client.hotelRoomsListRaw({ ...requestParameters });
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const resp: HotelRoomsList200Response = await response.raw.json();
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-member-access
      return resp.data;
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const fetchedData = await fetchRooms({ hotelId });
      console.log('Fetched Data:', fetchedData);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setData(fetchedData);
      setLoading(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getRooms();
  }, [hotelId]);
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
      />
    </>
  );
};

export default RoomsTable;

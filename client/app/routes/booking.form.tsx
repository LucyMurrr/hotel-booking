/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { Form, redirect } from 'react-router';

import client from '@api';
import { useState } from 'react';
import { Typography } from 'antd';
import type { Route } from './+types/newRoom.Form.js';

const { Paragraph } = Typography;

export async function action({ request, params }: Route.ActionArgs) {
  // userId, roomId, checkIn, checkOut
  const hd = await request.formData();
  const userId = 1; // костыль
  const checkInString = hd.get('startDate') as string;
  const checkOutString = hd.get('endDate') as string;
  const checkIn = new Date(checkInString);
  const checkOut = new Date(checkOutString);
  const roomIdString = params.roomId;
  const roomId = Number(roomIdString);
  const bookingCreateDto = { userId, roomId, checkIn, checkOut };
  const response = client.bookingsCreate({
    bookingCreateDto,
  });
  console.log(response);

  return redirect('/');
//   return null;
}

const NewRoom: React.FC<Route.ComponentProps> = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const totalPrice: number = 3000;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-lg">Выберите параметры бронирования</h1>
      <Form method="POST" className="max-w-[30rem]">

        <div className="flex flex-col gap-1 mb-7">
          <label>Название нмера</label>
          <Typography>
            <Paragraph>
              <pre>{totalPrice}</pre> {/* здесь выводится название номера */}
            </Paragraph>
          </Typography>
        </div>

        <div className="flex flex-col gap-1 mb-7">
          <label className="block mb-1 ">Выберите даты:</label>
          <div className="flex justify-arround mt-3">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 h-9 bg-blue-200 text-gray-500 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
            />
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 h-9 border bg-blue-200 text-gray-500 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col mt-5 gap-1 mb-7">
          <label>Конечная стоимость</label>
          <Typography>
            <Paragraph>
              <pre>{totalPrice}</pre>
            </Paragraph>
          </Typography>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
        >
          Забронировать
        </button>
      </Form>
    </div>
  );
};
export default NewRoom;

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import { Form, redirect } from 'react-router';

import client from '@api';
import type { Route } from './+types/newRoom.form';

export async function action({ request, params }: Route.ActionArgs) {
  const hd = await request.formData();
  const name = hd.get('name') as string;
  const description = hd.get('description') as string;
  const priceString = hd.get('price') as string;
  const price: number = Number(priceString);
  const hotelIdString = params.hotelId;
  const hotelId: number = Number(hotelIdString);
  const roomCreateDto = { name, description, price, hotelId };
  const response = client.hotelRoomsCreate({
    hotelId, roomCreateDto,
  });
  console.log(response);

  return redirect('/');
}

const NewRoom: React.FC<Route.ComponentProps> = () => (
  <div className="flex flex-col gap-4">
    <h1 className="font-bold text-lg">New Room</h1>
    <Form method="POST" className="max-w-[30rem]">
      <div className="flex flex-col gap-1">
        <label>Название</label>
        <input
          type="text"
          name="name"
          className="p-2 border text-gray-500 h-8 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Описание</label>
        <input
          type="text"
          name="description"
          className="p-2 border text-gray-500 h-8 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
        />
      </div>
      {/* <div className="flex flex-col gap-1">
        <label>Удобства</label>
        <input type="text" name="amenity" className="p-2 border-grey-400" />
      </div> */}
      <div className="flex flex-col gap-1">
        <label>Стоимость</label>
        <input
          type="text"
          name="price"
          className="p-2 border text-gray-500 h-8 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-2 mt-5 rounded-md shadow-md transition duration-200 hover:bg-blue-500"
      >Сохранить
      </button>
    </Form>
  </div>
);

export default NewRoom;

import { Form, redirect } from 'react-router';

import client from '@api';
import type { Route } from './+types/newRoom.Form.tsx';

export async function action({ request, params }: Route.ActionArgs) {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hd = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const name = hd.get('name') as string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const description = hd.get('description') as string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const priceString = hd.get('price') as string;
  const price: number = Number(priceString);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const hotelIdString = params.hotelId;
  const hotelId: number = Number(hotelIdString);
  const roomCreateDto = { name, description, price, hotelId };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const response = client.hotelRoomsCreateRaw({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    hotelId, roomCreateDto,
  });
  console.log(response);

  return redirect('/');
//   return null;
}

// Нам нужно получить id отеля из пути
const NewRoom: React.FC<Route.ComponentProps> = () => (
  <>
    <h1 className="font-bold text-lg">New Room</h1>
    <Form method="POST" className="max-w-[30rem]">
      <p className="flex flex-col gap-1">
        <label>Название</label>
        <input type="text" name="name" className="p-2 border-grey-400" />
      </p>
      <p className="flex flex-col gap-1">
        <label>Описание</label>
        <input type="text" name="description" className="p-2 border-grey-400" />
      </p>
      {/* <p className="flex flex-col gap-1">
        <label>Удобства</label>
        <input type="text" name="amenity" className="p-2 border-grey-400" />
      </p> */}
      <p className="flex flex-col gap-1">
        <label>Стоимость</label>
        <input type="text" name="price" className="p-2 border-grey-400" />
      </p>
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="bg-indigo-400 text-black px-3 py-1 rounded hover:bg-indigo-900">Сохранить</button>
    </Form>
  </>
);

export default NewRoom;

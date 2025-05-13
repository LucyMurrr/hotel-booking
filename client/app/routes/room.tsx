// Пока страница не нужна. Возможно, потом применим

/* eslint-disable max-len */
// /* eslint-disable max-len */
// import React from 'react';
// import {
//   Button,
//   Card, Space, Typography,
// } from 'antd';
// // import { HeartTwoTone, StarTwoTone } from '@ant-design/icons';
// // import { Link, useParams } from 'react-router';
// import type { RoomDto, RoomsGetRequest } from '@api';
// import { Link } from 'react-router-dom';
// import client from '@api';
// import type { Route } from './+types/hotel';

// export async function clientLoader({ params }: Route.LoaderArgs) {
//   const request: RoomsGetRequest = { roomId: Number(params.roomId) };
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, max-len
//   const response = await client.roomsGetRaw(request);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//   const data = await response.raw.json();
//   // console.log(data);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return data;
// }
// export type RoomPageProps = {
//   loaderData: RoomDto;
// };

// const cardStyle: React.CSSProperties = {
//   width: '100%',
//   display: 'flex',
//   flexDirection: 'column',
// };
// const RoomPage: React.FC<RoomPageProps> = ({
//   loaderData,
// }) => {
//   const {
//     name, description, price, amenities,
//   } = loaderData;
//   // console.log(loaderData);
//   return (
//     <Card hoverable style={cardStyle}>
//       <Space style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//       }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography.Title level={2} style={{ margin: '0 0 8px 0' }}>
//             {name}
//           </Typography.Title>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {/* <HeartTwoTone style={{ fontSize: '24px', marginRight: '16px' }} /> */}
//         </div>
//       </Space>

//       <div className="flex gap-4 justify-between h-full mt-5">
//         <img
//           alt="Room"
//           src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRKkcou-Xjhqa2ZCOyuf06STxjRX4A-gZJnhetJ1QT75gpWYVxb"
//           style={{
//             width: '50%',
//             height: 'auto',
//             display: 'block',
//           }}
//         />
//         <div style={{ display: 'flex' }}>
//           <Typography.Title level={5}>{description} </Typography.Title>
//         </div>
//       </div>
//       <div className="flex gap-4 justify-between h-full mt-5">
//         {amenities.map((amenity) => (
//           <Typography.Title key={amenity.id} level={5}>{amenity.name} </Typography.Title>
//         ))}
//         <Typography.Title level={5}>Стоимость: {price} </Typography.Title>
//         <Link to="/booking">
//           <Button>
//             Забронировать
//           </Button>
//         </Link>
//       </div>
//     </Card>
//   );
// };

// export default RoomPage;

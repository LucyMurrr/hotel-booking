import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.tsx'),
    // route('/hotels/:hotelId/rooms', 'routes/room.tsx'),
    route('/hotels/:hotelId/rooms/:roomId', 'routes/room.tsx'),
    route('/auth', 'routes/authorisation.form.tsx'),
    route('/profile', 'routes/profile.tsx'),
    route('/hotels/:hotelId', 'routes/hotel.tsx'),
    route('/hotels/:hotelId/newRoom', 'routes/newRoom.Form.tsx'),

  ]),
] satisfies RouteConfig;

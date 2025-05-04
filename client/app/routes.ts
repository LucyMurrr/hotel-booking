import {
  type RouteConfig, index, route, layout, prefix,
} from '@react-router/dev/routes';

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.tsx'),
    route('/profile', 'routes/profile.tsx'),
    route('/booking', 'routes/booking.form.tsx'),
    ...prefix('hotels', [
      route(':hotelId', 'routes/hotel.tsx'),
      route(':hotelId/newRoom', 'routes/newRoom.form.tsx'),
      route(':hotelId/rooms/:roomId', 'routes/room.tsx'),
    ]),
    route('/hotels/:hotelId/rooms/:roomId', 'routes/room.tsx'),
    route('/auth', 'routes/authorization.form.tsx'),
    route('/hotels/:hotelId', 'routes/hotel.tsx'),
    route('/hotels/:hotelId/newRoom', 'routes/newRoom.Form.tsx'),
  ]),
] satisfies RouteConfig;

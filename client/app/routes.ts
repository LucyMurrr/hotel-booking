import { type RouteConfig, index, route, prefix } from '@react-router/dev/routes';

export default [
  index('routes/hotels.component.tsx'),
  ...prefix('hotels', [
    route('/hotel', 'routes/hotel.component.tsx'),
  ]),
  route('/hotels/:hotelName/rooms', 'routes/rooms.component.tsx'),
  route('/auth', 'routes/authorisation.form.tsx'),
  route('/profile', 'routes/profile.component.tsx'),
] satisfies RouteConfig;

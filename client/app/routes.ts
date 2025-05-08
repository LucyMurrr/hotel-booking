import {
  type RouteConfig, index, route, layout, prefix,
} from '@react-router/dev/routes';

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.tsx'),
    route('/profile', 'routes/profile.tsx'),
    route('/bookings', 'routes/userBookings.tsx'),
    route('/booking/:roomId', 'routes/booking.tsx'),
    route('/signin', 'routes/signin.tsx'),
    route('/manager', 'routes/manager.tsx'),
    ...prefix('hotels', [
      route(':hotelId', 'routes/hotel.tsx'),
      route(':hotelId/newRoom', 'routes/newRoom.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

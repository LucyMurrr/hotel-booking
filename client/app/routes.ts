import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.tsx'),
    route('/hotels/:hotelName/rooms', 'routes/rooms.tsx'),
    route('/auth', 'routes/authorisation.form.tsx'),
    route('/profile', 'routes/profile.tsx'),
    route('/hotelC', 'routes/hotel.tsx'),
    route('/hotelsTab', 'routes/hotelsTab.tsx'),
    route('/hotels/:hotelName', 'routes/baseLayout.component.tsx'),

  ]),
] satisfies RouteConfig;

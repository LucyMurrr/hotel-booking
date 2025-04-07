import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

// export default [
//   index('routes/hotels.component.tsx'),
//   ...prefix('hotels', [
//     route('/hotel', 'routes/hotel.component.tsx'),
//   ]),
//   route('/hotels/:hotelName/rooms', 'routes/rooms.component.tsx'),
//   route('/auth', 'routes/authorisation.form.tsx'),
//   route('/profile', 'routes/profile.component.tsx'),
// ] satisfies RouteConfig;

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.component.tsx'),
    route('/hotels/:hotelName/rooms', 'routes/rooms.component.tsx'),
    route('/auth', 'routes/authorisation.form.tsx'),
    route('/profile', 'routes/profile.component.tsx'),
    route('/hotelC', 'routes/hotel.component.tsx'),
    route('/hotelsTab', 'routes/hotelsTab.component.tsx'),
    route('/hotels/:hotelName', 'routes/baseLayout.component.tsx'),

  ]),
] satisfies RouteConfig;

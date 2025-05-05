import {
  type RouteConfig, index, route, layout, prefix,
} from '@react-router/dev/routes';

export default [
  layout('routes/baseLayout.tsx', [
    index('routes/hotels.tsx'),
    route('/profile', 'routes/profile.tsx'),
    route('/booking', 'routes/booking.form.tsx'),
    route('/signin', 'routes/signin.tsx'),
    route('/login', 'routes/login.tsx'),
    ...prefix('hotels', [
      route(':hotelId', 'routes/hotel.tsx'),
      route(':hotelId/newRoom', 'routes/newRoom.tsx'),
      route(':hotelId/rooms/:roomId', 'routes/room.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

// const ProtectedRoute = ({ element, requiredRole }) => {
//   const { isAuthenticated, user } = useAuth();
//   if (!isAuthenticated) {
//       return <Navigator to="/login" />;
//   }
//   if (user.role !== requiredRole) {
//       return <Navigator to="/" />;
//   }
//   return element;
// };

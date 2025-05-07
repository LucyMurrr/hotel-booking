/* eslint-disable max-len */
import {
  List, Typography, Tag, Card, Rate,
} from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import client from '@api';
import type { Booking, RoomDto, Hotel } from '@api';
import { useAuth } from '~/authContext';

const { Text, Title } = Typography;

type EnrichedBooking = Booking & {
  room: RoomDto;
  hotel: Hotel;
  totalPrice: number;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<EnrichedBooking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const bookingsResponse = await client.userBookingsList({ userId: user.id });

      const enrichedBookings = await Promise.all(
        bookingsResponse.data.map(async (booking) => {
          const room = await client.roomsGet({ roomId: booking.roomId });
          const hotel = await client.hotelsGet({ hotelId: room.hotelId });
          return {
            ...booking,
            room,
            hotel,
            totalPrice: room.price * dayjs(booking.checkOut).diff(dayjs(booking.checkIn), 'days'),
          };
        }),
      );

      setBookings(enrichedBookings);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBookings();
  }, [user]);

  return (
    <Card title="Мои бронирования" styles={{ body: { padding: 0 } }}>
      <List
        itemLayout="vertical"
        dataSource={bookings}
        renderItem={(booking) => (
          <List.Item style={{ margin: 24 }}>
            <List.Item.Meta
              title={(
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Link to={`/hotels/${String(booking.hotel.id)}`}>{booking.hotel.name}</Link>
                    <Rate
                      disabled
                      defaultValue={booking.hotel.rating}
                      style={{ marginLeft: 16, fontSize: 14 }}
                    />
                  </div>
                  <Tag color={dayjs().isBefore(booking.checkOut) ? 'green' : 'default'}>
                    {dayjs().isBefore(booking.checkIn) ? 'Предстоящее' : 'Завершено'}
                  </Tag>
                </div>
              )}
              description={(
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <Text strong>Номер: {booking.room.name}</Text>
                    <br />
                    <Text type="secondary">
                      {booking.room.description}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Text>
                        {dayjs(booking.checkIn).format('DD.MM.YYYY')} - {dayjs(booking.checkOut).format('DD.MM.YYYY')}
                      </Text>
                      <br />
                      <Text>
                        {dayjs(booking.checkOut).diff(dayjs(booking.checkIn), 'days')} ночей
                      </Text>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      {booking.room.amenities.map((amenity) => (
                        <Tag key={amenity.id}>{amenity.name}</Tag>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: 120 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      ${booking.totalPrice}
                    </Title>
                    <Text type="secondary">
                      {booking.room.price}$/ночь
                    </Text>
                  </div>
                </div>
              )}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BookingsPage;

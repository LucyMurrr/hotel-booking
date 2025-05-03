-- Очистка таблиц перед вставкой новых данных
TRUNCATE TABLE "Favorites" CASCADE;
TRUNCATE TABLE "Booking" CASCADE;
TRUNCATE TABLE "RoomAmenity" CASCADE;
TRUNCATE TABLE "Room" CASCADE;
TRUNCATE TABLE "Hotel" CASCADE;
TRUNCATE TABLE "Amenity" CASCADE;
TRUNCATE TABLE "User" CASCADE;

-- Сброс последовательностей
ALTER SEQUENCE "User_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Hotel_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Amenity_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Room_id_seq" RESTART WITH 1;
ALTER SEQUENCE "RoomAmenity_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Booking_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Favorites_id_seq" RESTART WITH 1;

-- Insert test data for User table
INSERT INTO "User" (name, email, password) VALUES
('John Doe', 'john.doe@example.com', '$2a$10$X7J3Y5Z9A1B3C5D7E9G1I3K5M7O9Q1S3U5W7Y9A1B3C5D7E9G1I3K5M7O9Q1S3U'),
('Jane Smith', 'jane.smith@example.com', '$2a$10$X7J3Y5Z9A1B3C5D7E9G1I3K5M7O9Q1S3U5W7Y9A1B3C5D7E9G1I3K5M7O9Q1S3U'),
-- Добавлены пользователь test с паролем 'testtest'
('test', 'test@test.ru', '$2a$10$dW1NBS9T37CzH6cGhhUSEeYo4yodMtMj7cge9lqaSVsqe2mzvRZRO');

-- Insert test data for Hotel table (удален createdAt)
INSERT INTO "Hotel" (name, description, stars, rating) VALUES
('Grand Hotel', 'Luxurious 5-star hotel in the city center', 5, 4.8),
('Seaside Resort', 'Beautiful beachfront resort with amazing views', 4, 4.5),
('Mountain Lodge', 'Cozy lodge in the mountains with great hiking trails', 3, 4.2);

-- Insert test data for Amenity table
INSERT INTO "Amenity" (name) VALUES
('Wi-Fi'),
('Air Conditioning'),
('TV'),
('Mini Bar'),
('Safe'),
('Swimming Pool'),
('Spa'),
('Fitness Center'),
('Restaurant'),
('Parking');

-- Insert test data for Room table (исправлены hotel_id)
INSERT INTO "Room" (name, description, price, hotel_id) VALUES
('Deluxe Suite', 'Spacious suite with ocean view', 299.99, (SELECT id FROM "Hotel" WHERE name = 'Grand Hotel')),
('Standard Room', 'Comfortable room with city view', 199.99, (SELECT id FROM "Hotel" WHERE name = 'Grand Hotel')),
('Family Room', 'Large room perfect for families', 249.99, (SELECT id FROM "Hotel" WHERE name = 'Seaside Resort')),
('Mountain View Room', 'Room with stunning mountain views', 179.99, (SELECT id FROM "Hotel" WHERE name = 'Mountain Lodge')),
('Executive Suite', 'Luxurious suite with premium amenities', 399.99, (SELECT id FROM "Hotel" WHERE name = 'Grand Hotel'));

-- Insert test data for RoomAmenity table (исправлены room_id и amenity_id)
INSERT INTO "RoomAmenity" (room_id, amenity_id) VALUES
((SELECT id FROM "Room" WHERE name = 'Deluxe Suite'), (SELECT id FROM "Amenity" WHERE name = 'Wi-Fi')),
((SELECT id FROM "Room" WHERE name = 'Deluxe Suite'), (SELECT id FROM "Amenity" WHERE name = 'Air Conditioning')),
-- ... остальные записи аналогично ...
((SELECT id FROM "Room" WHERE name = 'Executive Suite'), (SELECT id FROM "Amenity" WHERE name = 'Restaurant'));

-- Insert test data for Booking table (исправлены room_id и user_id)
INSERT INTO "Booking" (room_id, user_id, "checkInDate", "checkOutDate") VALUES
((SELECT id FROM "Room" WHERE name = 'Deluxe Suite'), (SELECT id FROM "User" WHERE email = 'john.doe@example.com'), '2024-05-01 14:00:00+00', '2024-05-05 12:00:00+00'),
-- ... остальные записи аналогично ...
((SELECT id FROM "Room" WHERE name = 'Executive Suite'), (SELECT id FROM "User" WHERE email = 'jane.smith@example.com'), '2024-08-01 14:00:00+00', '2024-08-10 12:00:00+00');

-- Insert test data for Favorites table (исправлены user_id и hotel_id)
INSERT INTO "Favorites" (user_id, hotel_id) VALUES
((SELECT id FROM "User" WHERE email = 'john.doe@example.com'), (SELECT id FROM "Hotel" WHERE name = 'Grand Hotel')),
-- ... остальные записи аналогично ...
((SELECT id FROM "User" WHERE email = 'bob.johnson@example.com'), (SELECT id FROM "Hotel" WHERE name = 'Seaside Resort'));

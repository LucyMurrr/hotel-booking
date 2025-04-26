package aim.hotel_booking.service;

import aim.hotel_booking.entity.BookingEntity;
import aim.hotel_booking.mapper.BookingMapper;
import aim.hotel_booking.repository.BookingRepository;
import aim.hotel_booking.repository.specification.BookingSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.openapitools.model.Booking;
import org.openapitools.model.BookingCreateDto;
import org.openapitools.model.BookingUpdateDto;
import org.openapitools.model.UserBookingsList200Response;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.time.OffsetDateTime;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final BookingSpecification bookingSpecification;

    @Autowired
    public BookingService(
        BookingRepository bookingRepository,
        BookingMapper bookingMapper,
        BookingSpecification bookingSpecification
    ) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.bookingSpecification = bookingSpecification;
    }

    public List<BookingEntity> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<BookingEntity> getBookingById(Integer id) {
        return bookingRepository.findById(id);
    }

    public BookingEntity createBooking(BookingEntity booking) {
        return bookingRepository.save(booking);
    }

    public BookingEntity updateBooking(BookingEntity booking) {
        return bookingRepository.save(booking);
    }

    public ResponseEntity<Booking> getBooking(Integer bookingId) {
        return bookingRepository.findById(bookingId)
            .map(bookingMapper::toDto)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Booking not found with id: " + bookingId
            ));
    }

    public ResponseEntity<Void> deleteBooking(Integer bookingId) {
        // Проверяем существование бронирования
        if (!bookingRepository.existsById(bookingId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Booking not found with id: " + bookingId
            );
        }

        // Удаляем бронирование
        bookingRepository.deleteById(bookingId);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Booking> updateBooking(Integer bookingId, BookingUpdateDto bookingUpdateDto) {
        // Получаем существующее бронирование
        BookingEntity existingBooking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Booking not found with id: " + bookingId
            ));

        // Если обновляются даты, проверяем доступность номера
        if (bookingUpdateDto.getCheckIn() != null || bookingUpdateDto.getCheckOut() != null) {
            OffsetDateTime newCheckIn = bookingUpdateDto.getCheckIn() != null ? 
                bookingUpdateDto.getCheckIn() : existingBooking.getCheckInDate();
            OffsetDateTime newCheckOut = bookingUpdateDto.getCheckOut() != null ? 
                bookingUpdateDto.getCheckOut() : existingBooking.getCheckOutDate();

            // Проверяем пересечение с другими бронированиями
            long overlappingBookings = bookingRepository.count(
                bookingSpecification.datesOverlap(
                    existingBooking.getRoom().getId(),
                    newCheckIn,
                    newCheckOut,
                    bookingId
                )
            );

            if (overlappingBookings > 0) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Room is not available for the selected dates"
                );
            }
        }

        // Обновляем поля бронирования
        if (bookingUpdateDto.getUserId() != null) {
            existingBooking.getUser().setId(bookingUpdateDto.getUserId());
        }
        if (bookingUpdateDto.getRoomId() != null) {
            existingBooking.getRoom().setId(bookingUpdateDto.getRoomId());
        }
        if (bookingUpdateDto.getCheckIn() != null) {
            existingBooking.setCheckInDate(bookingUpdateDto.getCheckIn());
        }
        if (bookingUpdateDto.getCheckOut() != null) {
            existingBooking.setCheckOutDate(bookingUpdateDto.getCheckOut());
        }

        // Сохраняем обновленное бронирование
        BookingEntity updatedBooking = bookingRepository.save(existingBooking);
        return ResponseEntity.ok(bookingMapper.toDto(updatedBooking));
    }

    public ResponseEntity<Booking> createBooking(BookingCreateDto bookingCreateDto) {
        // Проверяем доступность номера
        long overlappingBookings = bookingRepository.count(
            bookingSpecification.datesOverlap(
                bookingCreateDto.getRoomId(),
                bookingCreateDto.getCheckIn(),
                bookingCreateDto.getCheckOut(),
                null
            )
        );

        if (overlappingBookings > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room is not available for the selected dates");
        }

        // Создаем новое бронирование
        BookingEntity bookingEntity = bookingMapper.toEntity(bookingCreateDto);
        BookingEntity savedBooking = bookingRepository.save(bookingEntity);
        Booking booking = bookingMapper.toDto(savedBooking);

        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    public ResponseEntity<UserBookingsList200Response> getUserBookings(
        Integer userId,
        Integer roomId,
        OffsetDateTime checkInBefore,
        OffsetDateTime checkInAfter,
        OffsetDateTime checkOutBefore,
        OffsetDateTime checkOutAfter,
        String sortBy,
        Sort.Direction sortOrder,
        Integer page,
        Integer perPage
    ) {
        // Implementation of getUserBookings method
        return null; // Placeholder return, actual implementation needed
    }
} 
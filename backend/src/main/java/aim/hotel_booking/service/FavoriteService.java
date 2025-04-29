package aim.hotel_booking.service;

import aim.hotel_booking.entity.FavoriteEntity;
import aim.hotel_booking.entity.HotelEntity;
import aim.hotel_booking.entity.UserEntity;
import aim.hotel_booking.mapper.FavoriteMapper;
import aim.hotel_booking.repository.FavoriteRepository;
import aim.hotel_booking.repository.HotelRepository;
import aim.hotel_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.openapitools.model.Hotel;
import org.openapitools.model.FavoriteCreateDto;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final FavoriteMapper favoriteMapper;

    @Autowired
    public FavoriteService(
        FavoriteRepository favoriteRepository,
        UserRepository userRepository,
        HotelRepository hotelRepository,
        FavoriteMapper favoriteMapper
    ) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
        this.favoriteMapper = favoriteMapper;
    }

    public Hotel createFavorite(FavoriteCreateDto favoriteCreateDto) {
        // Получаем текущего пользователя из контекста безопасности
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByName(name)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
            ));

        HotelEntity hotel = hotelRepository.findById(favoriteCreateDto.getHotelId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Hotel not found with id: " + favoriteCreateDto.getHotelId()
            ));

        // Проверяем, не добавлен ли отель уже в избранное
        if (favoriteRepository.existsByUserIdAndHotelId(user.getId(), hotel.getId())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Hotel is already in favorites"
            );
        }

        // Создаем новую запись в избранном
        FavoriteEntity favorite = new FavoriteEntity();
        favorite.setUser(user);
        favorite.setHotel(hotel);
        FavoriteEntity savedFavorite = favoriteRepository.save(favorite);

        return favoriteMapper.toDto(savedFavorite);
    }
} 

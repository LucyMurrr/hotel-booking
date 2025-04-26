package aim.hotel_booking.impl;

import aim.hotel_booking.service.FavoriteService;
import org.openapitools.api.FavoritesApiDelegate;
import org.openapitools.model.FavoriteCreateDto;
import org.openapitools.model.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomFavoritesApiDelegate implements FavoritesApiDelegate {

    private final FavoriteService favoriteService;

    @Autowired
    public CustomFavoritesApiDelegate(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @Override
    public ResponseEntity<Hotel> favoritesCreate(FavoriteCreateDto favoriteCreateDto) {
        Hotel hotel = favoriteService.createFavorite(favoriteCreateDto);
        return ResponseEntity.status(201).body(hotel);
    }
} 
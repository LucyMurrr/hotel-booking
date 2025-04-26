package aim.hotel_booking.mapper;

import aim.hotel_booking.entity.FavoriteEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.Hotel;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {
    @Mapping(target = "id", source = "hotel.id")
    @Mapping(target = "name", source = "hotel.name")
    @Mapping(target = "description", source = "hotel.description")
    @Mapping(target = "stars", source = "hotel.stars")
    @Mapping(target = "rating", source = "hotel.rating")
    Hotel toDto(FavoriteEntity favorite);
} 
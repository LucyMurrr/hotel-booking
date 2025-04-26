package aim.hotel_booking.mapper;

import aim.hotel_booking.entity.AmenityEntity;
import org.openapitools.model.Amenity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AmenityMapper {
    Amenity toDto(AmenityEntity entity);

    AmenityEntity toEntity(Amenity dto);
}

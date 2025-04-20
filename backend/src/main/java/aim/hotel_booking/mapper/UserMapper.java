package aim.hotel_booking.mapper;

import aim.hotel_booking.entity.UserEntity;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.mapstruct.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "password", ignore = true)
    UserEntity toEntity(UserCreateDto dto);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    UserDto toDto(UserEntity entity);

    default UserEntity toEntityWithPassword(UserCreateDto dto, PasswordEncoder encoder) {
        UserEntity entity = toEntity(dto);
        entity.setPassword(encoder.encode(dto.getPassword()));
        return entity;
    }
}

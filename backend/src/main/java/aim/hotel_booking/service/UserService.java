package aim.hotel_booking.service;

import aim.hotel_booking.entity.UserEntity;
import aim.hotel_booking.mapper.UserMapper;
import aim.hotel_booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.net.URI;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    public ResponseEntity<UserDto> createUser(UserCreateDto dto) {
        UserEntity entity = mapper.toEntityWithPassword(dto, encoder);
        UserEntity savedEntity = repository.save(entity);
        UserDto responseDto = mapper.toDto(savedEntity);
        return ResponseEntity
                .created(URI.create("/users/" + savedEntity.getId())) // URI нового ресурса
                .body(responseDto);
    }
}

package aim.hotel_booking.service;

import aim.hotel_booking.repository.UserRepository;
import org.openapitools.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<UserDto> createUser(UserCreateDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new UserDto());
        }

        User user = new User()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword()); // В реальном проекте обязательно шифруйте!

        User savedUser = userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(convertToDto(savedUser));
    }

    public ResponseEntity<UserDto> getUser(Integer id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(convertToDto(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    private UserDto convertToDto(User user) {
        return new UserDto()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail());
    }
}

package aim.hotel_booking.service.impl;

import aim.hotel_booking.repository.UserRepository;
import aim.hotel_booking.service.UserService;
import org.openapitools.model.User;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.openapitools.model.UserUpdateDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(UserCreateDto userCreateDto) {
        // Check if user with this email already exists
        if (userRepository.existsByEmail(userCreateDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
        }

        // Create new user
        User user = new User();
        user.setName(userCreateDto.getName());
        user.setEmail(userCreateDto.getEmail());
        user.setPassword(userCreateDto.getPassword()); // TODO: Add password encryption

        // Save user to database
        user = userRepository.save(user);

        // Convert to DTO and return
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    @Override
    public UserDto getUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    @Override
    public UserDto updateUser(Integer userId, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (userUpdateDto.getName() != null) {
            user.setName(userUpdateDto.getName());
        }
        if (userUpdateDto.getEmail() != null) {
            if (!user.getEmail().equals(userUpdateDto.getEmail()) && 
                userRepository.existsByEmail(userUpdateDto.getEmail())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
            }
            user.setEmail(userUpdateDto.getEmail());
        }
        if (userUpdateDto.getPassword() != null) {
            user.setPassword(userUpdateDto.getPassword()); // TODO: Add password encryption
        }

        user = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    @Override
    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.deleteById(userId);
    }
} 
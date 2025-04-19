package aim.hotel_booking.service;

import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.openapitools.model.UserUpdateDto;

public interface UserService {
    UserDto createUser(UserCreateDto userCreateDto);
    UserDto getUser(Integer userId);
    UserDto updateUser(Integer userId, UserUpdateDto userUpdateDto);
    void deleteUser(Integer userId);
} 
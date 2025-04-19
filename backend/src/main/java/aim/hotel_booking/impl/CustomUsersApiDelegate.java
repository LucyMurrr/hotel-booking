package aim.hotel_booking.impl;

import aim.hotel_booking.service.UserService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.openapitools.model.*;
import org.openapitools.api.*;
import org.springframework.http.ResponseEntity;

import java.net.URI;

@Service
@Primary
public class CustomUsersApiDelegate implements UsersApiDelegate {

    private final UserService userService;

    public CustomUsersApiDelegate(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserDto> usersCreateUser(UserCreateDto userCreateDto) {
        return userService.createUser(userCreateDto);
    }

    @Override
    public ResponseEntity<UserDto> usersGetUser(Integer userId) {
        return userService.getUser(userId);
    }
}

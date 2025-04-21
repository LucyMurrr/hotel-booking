package aim.hotel_booking.impl;

import aim.hotel_booking.service.UserService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.openapitools.api.UsersApiDelegate;
import org.springframework.http.ResponseEntity;

@Service
@Primary
public class CustomUsersApiDelegate implements UsersApiDelegate {
    private final UserService service;

    public CustomUsersApiDelegate(UserService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<UserDto> usersCreateUser(UserCreateDto userCreateDto) {
        return service.createUser(userCreateDto);
    }
}

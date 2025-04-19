package aim.hotel_booking.controller;

import aim.hotel_booking.service.UserService;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UserDto;
import org.openapitools.model.UserUpdateDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserCreateDto userCreateDto) {
        UserDto userDto = userService.createUser(userCreateDto);
        return ResponseEntity.status(201).body(userDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer userId) {
        UserDto userDto = userService.getUser(userId);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Integer userId,
            @RequestBody UserUpdateDto userUpdateDto) {
        UserDto userDto = userService.updateUser(userId, userUpdateDto);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
} 

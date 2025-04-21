package aim.hotel_booking.impl;

import aim.hotel_booking.service.UserService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.openapitools.model.UserDto;
import org.openapitools.model.UserCreateDto;
import org.openapitools.model.UsersListUsers200Response;
import org.openapitools.api.UsersApiDelegate;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;

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

    @Override
    public ResponseEntity<UsersListUsers200Response> usersListUsers(
            String name,
            String email,
            String sortBy,
            Integer page,
            Integer perPage,
            String sortOrder
    ) {
        // Установка значений по умолчанию
        if (page == null || page < 1) {
            page = 1;
        }
        if (perPage == null || perPage < 1) {
            perPage = 24;
        }
        if (sortBy == null) {
            sortBy = "name";
        }
        if (sortOrder == null) {
            sortOrder = "ASC";
        }

        // Валидация параметров сортировки
        try {
            UsersListUsers200Response.SortByEnum.fromValue(sortBy);
            UsersListUsers200Response.SortOrderEnum.fromValue(sortOrder);
        } catch (IllegalArgumentException e) {
            sortBy = "name";
            sortOrder = "ASC";
        }

        return service.getUsers(
                name,
                email,
                sortBy,
                Sort.Direction.fromString(sortOrder),
                page,
                perPage
        );
    }
}

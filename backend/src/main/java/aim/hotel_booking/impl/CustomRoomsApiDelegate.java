package aim.hotel_booking.impl;

import aim.hotel_booking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.RoomsApiDelegate;
import org.openapitools.model.RoomDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
public class CustomRoomsApiDelegate implements RoomsApiDelegate {

    private final RoomService roomService;

    @Override
    public ResponseEntity<RoomDto> roomsGet(Integer roomId) {
        try {
            return roomService.roomsGet(roomId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing request", e);
        }
    }
}

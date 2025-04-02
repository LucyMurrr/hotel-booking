package aim.hotel_booking.сontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/devStatus")
    public String test() {
        return "Application is running!";
    }
}

package aim.hotel_booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"aim.hotel_booking", "org.openapitools"})
public class HotelBookingApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(HotelBookingApplication.class, args);
	}

}

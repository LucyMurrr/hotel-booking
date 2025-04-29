package aim.hotel_booking.repository.specification;

import aim.hotel_booking.entity.FavoriteEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class FavoriteSpecification {

    public Specification<FavoriteEntity> hasUserId(Integer userId) {
        return (root, query, cb) -> 
            userId != null ? cb.equal(root.get("user").get("id"), userId) : null;
    }

    public Specification<FavoriteEntity> hasHotelId(Integer hotelId) {
        return (root, query, cb) -> 
            hotelId != null ? cb.equal(root.get("hotel").get("id"), hotelId) : null;
    }
}

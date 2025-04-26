package aim.hotel_booking.repository;

import aim.hotel_booking.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
    Optional<FavoriteEntity> findByUserIdAndHotelId(Integer userId, Integer hotelId);
    boolean existsByUserIdAndHotelId(Integer userId, Integer hotelId);
} 
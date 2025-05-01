package aim.hotel_booking.repository;

import aim.hotel_booking.entity.FavoriteEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
    Optional<FavoriteEntity> findByUserIdAndHotelId(Integer userId, Integer hotelId);
    boolean existsByUserIdAndHotelId(Integer userId, Integer hotelId);

    @Query(value = "SELECT f.* FROM \"Favorites\" f " +
           "JOIN \"Hotel\" h ON h.\"id\" = f.\"hotel_id\" " +
           "WHERE f.\"user_id\" = :userId " +
           "AND (:name IS NULL OR h.\"name\"::text LIKE '%' || :name || '%') " +
           "AND (:minRating IS NULL OR h.\"rating\" >= :minRating) " +
           "AND (:maxRating IS NULL OR h.\"rating\" <= :maxRating) " +
           "AND (:minStars IS NULL OR h.\"stars\" >= :minStars) " +
           "AND (:maxStars IS NULL OR h.\"stars\" <= :maxStars)",
           countQuery = "SELECT COUNT(f.*) FROM \"Favorites\" f " +
           "JOIN \"Hotel\" h ON h.\"id\" = f.\"hotel_id\" " +
           "WHERE f.\"user_id\" = :userId " +
           "AND (:name IS NULL OR h.\"name\"::text LIKE '%' || :name || '%') " +
           "AND (:minRating IS NULL OR h.\"rating\" >= :minRating) " +
           "AND (:maxRating IS NULL OR h.\"rating\" <= :maxRating) " +
           "AND (:minStars IS NULL OR h.\"stars\" >= :minStars) " +
           "AND (:maxStars IS NULL OR h.\"stars\" <= :maxStars)",
           nativeQuery = true)
    Page<FavoriteEntity> findByUserIdWithFilters(
            @Param("userId") Integer userId,
            @Param("name") String name,
            @Param("minRating") Double minRating,
            @Param("maxRating") Double maxRating,
            @Param("minStars") Integer minStars,
            @Param("maxStars") Integer maxStars,
            Pageable pageable);
}

package aim.hotel_booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "Hotel")
@Getter
@Setter
public class HotelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private Integer stars;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    // Дополнительные поля, если необходимо
    @Column(length = 100)
    private String address;

    @Column(length = 20)
    private String phone;
}

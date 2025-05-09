package aim.hotel_booking.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private Integer senderId;
    private Integer receiverId;
    private String content;
    private LocalDateTime createdAt;
} 
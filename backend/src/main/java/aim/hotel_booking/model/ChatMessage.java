package aim.hotel_booking.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String id;
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime timestamp;
    private MessageType type;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
} 
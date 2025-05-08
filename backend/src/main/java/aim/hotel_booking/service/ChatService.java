package aim.hotel_booking.service;

import aim.hotel_booking.model.ChatMessage;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatService {
    // Хранилище активных чатов: ключ - ID чата (комбинация ID пользователя и менеджера)
    private final Map<String, ChatMessage> activeChats = new ConcurrentHashMap<>();

    public void addChat(ChatMessage chatMessage) {
        String chatId = generateChatId(chatMessage.getSenderId(), chatMessage.getReceiverId());
        activeChats.put(chatId, chatMessage);
    }

    public Map<String, ChatMessage> getActiveChats() {
        return activeChats;
    }

    private String generateChatId(String userId, String managerId) {
        // Сортируем ID, чтобы чат между пользователем и менеджером имел одинаковый ID
        return userId.compareTo(managerId) < 0 
            ? userId + "_" + managerId 
            : managerId + "_" + userId;
    }
} 
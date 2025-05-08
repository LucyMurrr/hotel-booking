package aim.hotel_booking.controller;

import aim.hotel_booking.model.ChatMessage;
import aim.hotel_booking.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.UUID;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    @PreAuthorize("isAuthenticated()")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        chatMessage.setSenderId(auth.getName());
        chatMessage.setId(UUID.randomUUID().toString());
        chatMessage.setTimestamp(LocalDateTime.now());
        return chatMessage;
    }

    @MessageMapping("/chat.private")
    @PreAuthorize("isAuthenticated()")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        chatMessage.setSenderId(auth.getName());
        chatMessage.setId(UUID.randomUUID().toString());
        chatMessage.setTimestamp(LocalDateTime.now());
        
        // Сохраняем чат в активных чатах
        chatService.addChat(chatMessage);
        
        // Отправляем сообщение отправителю
        messagingTemplate.convertAndSendToUser(
            chatMessage.getSenderId(),
            "/queue/private",
            chatMessage
        );
        
        // Отправляем сообщение получателю
        messagingTemplate.convertAndSendToUser(
            chatMessage.getReceiverId(),
            "/queue/private",
            chatMessage
        );
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    @PreAuthorize("isAuthenticated()")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        chatMessage.setSenderId(auth.getName());
        headerAccessor.getSessionAttributes().put("username", auth.getName());
        return chatMessage;
    }

    @MessageMapping("/chat.getActiveChats")
    @PreAuthorize("hasRole('MANAGER')")
    public void getActiveChats() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        messagingTemplate.convertAndSendToUser(
            auth.getName(),
            "/queue/activeChats",
            chatService.getActiveChats()
        );
    }
} 
package aim.hotel_booking.controller;

import aim.hotel_booking.dto.MessageDTO;
import aim.hotel_booking.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // Получение всех сообщений
    @GetMapping
    public List<MessageDTO> getAllMessages() {
        return messageService.getAllMessages();
    }

    // Получение всех сообщений пользователя
    @GetMapping("/{userId}")
    public List<MessageDTO> getUserMessages(@PathVariable Integer userId) {
        return messageService.getUserMessages(userId);
    }

    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload MessageDTO message) {
        messageService.sendMessage(
            message.getSenderId(),
            message.getReceiverId(),
            message.getContent()
        );
    }
}

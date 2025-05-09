package aim.hotel_booking.service;

import aim.hotel_booking.dto.MessageDTO;
import aim.hotel_booking.entity.MessageEntity;
import aim.hotel_booking.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Получение всех сообщений пользователя
    public List<MessageDTO> getUserMessages(Integer userId) {
        List<MessageEntity> messages = messageRepository.findBySenderIdOrReceiverIdOrderByCreatedAtDesc(userId, userId);
        return messages.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Получение всех сообщений
    public List<MessageDTO> getAllMessages() {
        List<MessageEntity> messages = messageRepository.findAllByOrderByCreatedAtDesc();
        return messages.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public MessageDTO sendMessage(Integer senderId, Integer receiverId, String content) {
        MessageEntity message = new MessageEntity();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(content);
        
        message = messageRepository.save(message);
        MessageDTO messageDTO = convertToDTO(message);
        
        // Отправляем сообщение через WebSocket
        messagingTemplate.convertAndSendToUser(
            receiverId.toString(),
            "/user/queue/messages",
            messageDTO
        );
        
        return messageDTO;
    }

    private MessageDTO convertToDTO(MessageEntity entity) {
        MessageDTO dto = new MessageDTO();
        dto.setId(entity.getId());
        dto.setSenderId(entity.getSenderId());
        dto.setReceiverId(entity.getReceiverId());
        dto.setContent(entity.getContent());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
} 
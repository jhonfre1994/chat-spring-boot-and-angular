package com.app.chatBack.controller;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.entity.ChatMessage;
import com.app.chatBack.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
//@CrossOrigin(origins = "*", allowedHeaders = "true")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) throws ApiException {
        ChatMessage message = chatMessageService.saveMessage(chatMessage);
        messagingTemplate.convertAndSendToUser(
                message.getClientId(), "/queue/messages", message);
    }


    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages(@PathVariable String senderId,
            @PathVariable String recipientId) {
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<?> findMessage(@PathVariable String id) throws ApiException {
        return ResponseEntity
                .ok(chatMessageService.findById(id));
    }

  @MessageMapping("/test")
  public void findMessage2() {
    messagingTemplate.convertAndSend("/user/queue/users", "as");
  }
}

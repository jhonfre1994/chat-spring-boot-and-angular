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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
                message.getConsultantId(), "/queue/messages", message);
    }


    @GetMapping("/messages/{chatId}")
    public ResponseEntity<?> findChatMessages(@PathVariable String chatId) throws ApiException {
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(chatId));
    }

    @PostMapping("/chatTest")
    public ResponseEntity<Void> testMessaje(@RequestBody ChatMessage chatMessage) throws ApiException {
        ChatMessage message = chatMessageService.saveMessage(chatMessage);
        messagingTemplate.convertAndSendToUser(
                message.getChatId(), "/queue/messages", message);
        return ResponseEntity.ok().build();
    }
}

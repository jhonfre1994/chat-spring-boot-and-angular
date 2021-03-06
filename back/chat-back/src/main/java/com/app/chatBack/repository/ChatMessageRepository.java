package com.app.chatBack.repository;


import com.app.chatBack.model.ChatMessage;
import com.app.chatBack.utils.MessageStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository
        extends MongoRepository<ChatMessage, String> {

    long countBySenderNameAndRecipientNameAndStatus(
            String senderName, String recipientName, String status);

    List<ChatMessage> findByChatId(String chatId);
}
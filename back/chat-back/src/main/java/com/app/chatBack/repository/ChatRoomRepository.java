package com.app.chatBack.repository;

import com.app.chatBack.model.entity.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    Optional<ChatRoom> findBySenderUserNameAndRecipientUserName(String senderUserName, String recipientUserName);
    Optional<ChatRoom> findByChatId(String chatId);
}

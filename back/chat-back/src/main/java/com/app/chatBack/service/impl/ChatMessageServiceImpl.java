package com.app.chatBack.service.impl;

import com.app.chatBack.exception.ResourceNotFoundException;
import com.app.chatBack.model.ChatMessage;
import com.app.chatBack.utils.MessageStatus;
import com.app.chatBack.repository.ChatMessageRepository;
import com.app.chatBack.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private ChatMessageRepository repository;
    @Autowired
    private ChatRoomServiceImpl chatRoomService;
    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public long countNewMessages(String senderId, String recipientId) {
        return repository.countBySenderNameAndRecipientNameAndStatus(
                senderId, recipientId, MessageStatus.RECEIVED);
    }

    @Override
    public List<ChatMessage> findChatMessages(String senderName, String recipientName) {
        var chatId = chatRoomService.getChatId(senderName, recipientName, false);

        var messages
                = chatId.map(cId -> repository.findByChatId(cId)).orElse(new ArrayList<>());

        if (messages.size() > 0) {
            updateStatuses(senderName, recipientName, MessageStatus.DELIVERED);
        }

        return messages;
    }

    @Override
    public ChatMessage findById(String id) {
        return repository
                .findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return repository.save(chatMessage);
                })
                .orElseThrow(()
                        -> new ResourceNotFoundException("can't find message (" + id + ")"));
    }

    @Override
    public void updateStatuses(String senderName, String recipientName, String status) {
        Query query = new Query(
                Criteria
                        .where("senderName").is(recipientName)
                        .and("recipientName").is(senderName));
        Update update = Update.update("status", status);
        mongoOperations.updateMulti(query, update, ChatMessage.class);
    }

    @Override
    public ChatMessage saveMessage(ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderName(), chatMessage.getRecipientName(), true);
        chatMessage.setChatId(chatId.get());
        chatMessage.setStatus(MessageStatus.RECEIVED);
        repository.save(chatMessage);
        return chatMessage;
    }
}

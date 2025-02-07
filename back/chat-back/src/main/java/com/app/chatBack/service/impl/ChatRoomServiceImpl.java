package com.app.chatBack.service.impl;

import com.app.chatBack.model.entity.ChatRoom;
import com.app.chatBack.repository.ChatRoomRepository;
import com.app.chatBack.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Override
    public Optional<String> getChatId(
            String clientId, String consultantId) {

        return chatRoomRepository
                .findBySenderUserNameAndRecipientUserName(clientId, consultantId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    var chatId
                            = String.format("%s_%s", clientId, consultantId);

                    ChatRoom senderRecipient = ChatRoom
                            .builder()
                            .chatId(chatId)
                            .senderUserName(clientId)
                            .recipientUserName(consultantId)
                            .build();

                    chatRoomRepository.save(senderRecipient);

                    return Optional.of(chatId);
                });
    }
}

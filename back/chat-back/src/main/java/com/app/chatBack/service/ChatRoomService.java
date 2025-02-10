package com.app.chatBack.service;

import com.app.chatBack.exceptions.ApiException;

import java.util.Optional;

public interface ChatRoomService {

    Optional<String> getChatId(String clientId, String consultantId);
    String getByIdChat(String chatId) throws ApiException;
}

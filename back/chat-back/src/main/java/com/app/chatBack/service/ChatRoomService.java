package com.app.chatBack.service;

import java.util.Optional;

public interface ChatRoomService {

    Optional<String> getChatId(String clientId, String consultantId);
}

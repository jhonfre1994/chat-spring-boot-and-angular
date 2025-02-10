/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.entity.ChatMessage;
import java.util.List;

/**
 *
 * @author jhonfre
 */
public interface ChatMessageService {
    
    ChatMessage saveMessage(ChatMessage chatMessage) throws ApiException;

    List<ChatMessage> findChatMessages(String chatId) throws ApiException;
    
    ChatMessage findById(String id) throws ApiException;
    
    void updateStatuses(String senderName, String recipientName, String status);
}

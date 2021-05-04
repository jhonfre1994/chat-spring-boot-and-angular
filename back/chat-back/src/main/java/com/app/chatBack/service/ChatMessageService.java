/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service;

import com.app.chatBack.model.ChatMessage;
import java.util.List;

/**
 *
 * @author jhonfre
 */
public interface ChatMessageService {
    
    ChatMessage saveMessage(ChatMessage chatMessage);
    
    long countNewMessages(String senderName, String recipientName);
    
    List<ChatMessage> findChatMessages(String senderName, String recipientName);
    
    ChatMessage findById(String id);
    
    void updateStatuses(String senderName, String recipientName, String status);
}

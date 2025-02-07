package com.app.chatBack.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chat_room")
public class ChatRoom {

    @Id
    private String id;
    private String chatId;
    // numero de telofono del cliente
    private String senderUserName;
    // username del asesor
    private String recipientUserName;

}

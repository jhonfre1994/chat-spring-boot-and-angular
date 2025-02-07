package com.app.chatBack.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chat_message")
public class ChatMessage {

   @Id
   private String id;
   private String chatId;
   private String clientId;
   private String consultantId;
   private String content;
   private Date timestamp;
   private String status;
   private String typeMessage;

}

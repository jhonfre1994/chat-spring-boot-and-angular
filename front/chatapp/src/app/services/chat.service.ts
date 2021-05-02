import { Optional } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Chat } from '../model/chat.model';
import { Messages } from '../model/messages';
import { UsuarioListDTO } from '../model/UsuarioListDTO';

/**
 * varible soclñ
 */
declare var SockJS;
/**
 * variable stomp
 */
declare var Stomp;
export class ChatService2 {
  chatComponent: ChatComponent
  public talk;
  public stompClient;
  public url = 'http://localhost:8080';

  constructor(@Optional() chatComponent: ChatComponent) {
    this.chatComponent = chatComponent;
  }


  connectToChat(userName) {
    
    console.log("connecting to chat...")
    const serverUrl = this.url + '/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/user/' + userName + '/queue/messages' , (message) => {
        let data = JSON.parse(message.body);
        this.talk = new Messages(data.fromLogin, data.message, data.date, false);
        that.onMessageReceived(this.talk)
      });
    });
  }

  sendMsg(from, text, selectedUser: UsuarioListDTO) {
    this.stompClient.send("/app/chat", {}, JSON.stringify({
      senderId: from,
      recipientId: selectedUser.nombreUsuario,
      senderName: from,
      recipientName: selectedUser.nombreUsuario,
      content: text,
      timestamp: new Date(),
    }));
  }


  onMessageReceived(message) {
    this.chatComponent.handleMessage(message);
  }

}

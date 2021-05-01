import { Optional } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Chat } from '../model/chat.model';
import { Messages } from '../model/messages';

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
    const serverUrl = this.url + '/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic/messages/' + userName, (message) => {
        let data = JSON.parse(message.body);
        this.talk = new Messages(data.fromLogin, data.message, data.date, false);
        that.onMessageReceived(this.talk)
      });

      that.stompClient.subscribe('/topic/users/', (message) => {
        let data = JSON.parse(message.body);
        that.onMessageReceivedUsers(data)
      });
    });
  }

  sendMsg(from, text, selectedUser) {
    this.stompClient.send("/topic/messages/" + selectedUser, {}, JSON.stringify({
      fromLogin: from,
      message: text,
      date: new Date(),
      my: true
    }));
  }


  onMessageReceived(message) {
    this.chatComponent.handleMessage(message);
  }


  onMessageReceivedUsers(listUsers) {
    this.chatComponent.onMessageReceivedUsers(listUsers);
  }
}

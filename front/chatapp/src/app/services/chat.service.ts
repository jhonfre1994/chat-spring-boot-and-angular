import { Optional } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Chat } from '../model/chat.model';

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
        this.talk = new Chat("", data.fromLogin, "", data.message, data.date, false);
        console.log(data)
        console.log(data.message)
        console.log(data.fromLogin)
        console.log(this.talk)
        that.onMessageReceived(this.talk)
        //console.log(data)
        /* if (selectedUser === data.fromLogin) {
            render(data.message, data.fromLogin);
        } else {
            newMessages.set(data.fromLogin, data.message);
            $('#userNameAppender_' + data.fromLogin).append('<span id="newMessage_' + data.fromLogin + '" style="color: red">+1</span>');
        } */

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
    console.log("Message Recieved from Server :: " + message);
    this.chatComponent.handleMessage(message);
  }
}

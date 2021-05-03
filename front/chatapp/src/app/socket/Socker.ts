import { Optional } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Chat } from '../model/chat.model';
import { Messages } from '../model/messages';
import { UsuarioListDTO } from '../model/UsuarioListDTO';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { ChatMessage } from '../model/ChatMessage';


/**
 * varible soclñ
 */
declare var SockJS;
/**
 * variable stomp
 */
declare var Stomp;
export class Socket {
    chatComponent: ChatComponent
    public talk;
    public stompClient;
    public url = 'http://localhost:8080';
    decoded: any;

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
            that.stompClient.subscribe('/user/' + that.getUsernameToken() + '/queue/messages', (message) => {
                let data = JSON.parse(message.body);
                that.onMessageReceived(data)
            });


            that.stompClient.subscribe('/queue/users', (message) => {
                let data = JSON.parse(message.body);
            });


        });
    }

   /*  onConnected(){
        console.log("connected");
        stompClient.subscribe(
          "/user/" + currentUser.id + "/queue/messages",
          onMessageReceived
        );
      };
 */


    sendMsg(text, selectedUser: UsuarioListDTO) {
        this.stompClient.send("/app/chat", {}, JSON.stringify({
            senderId: this.getIdUsernameToken(),
            recipientId: selectedUser.idUsuario,
            senderName: this.getUsernameToken(),
            recipientName: selectedUser.nombreUsuario,
            content: text,
            timestamp: new Date(),
        }));
    }

    onMessageReceived(message) {
        this.chatComponent.handleMessage(message);
    }


    getIdUsernameToken(): string {
        let token = sessionStorage.getItem("access_token");
        this.decoded = jwt_decode(token);
        return this.decoded.user_id;
    }


    getUsernameToken(): string {
        let token = sessionStorage.getItem("access_token");
        this.decoded = jwt_decode(token);
        return this.decoded.user_name;
    }

}

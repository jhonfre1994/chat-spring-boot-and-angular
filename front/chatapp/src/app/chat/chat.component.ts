import { Component, OnInit, HostListener, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Messages } from '../model/messages';
import { UsuarioListDTO } from '../model/UsuarioListDTO';
import { Socket } from '../socket/Socker';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../model/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UsersService, ChatService]
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<UsuarioListDTO> = [];
  public talks: Array<ChatMessage> = [];
  public sidenavOpen: boolean = true;
  public currentChat: UsuarioListDTO;
  public newMessage: string;
  public userName: string;
  public hideElement: boolean = false;
  socketService: Socket;
  static instance: ChatComponent;

  constructor(private usersService: UsersService, private chatService: ChatService) {
    this.currentChat = new UsuarioListDTO();
    this.talks = [];
    if (ChatComponent.instance) {
      return ChatComponent.instance;
    }

    ChatComponent.instance = this;
  }

  ngOnInit() {
    //this.registrar();
    this.socketService = new Socket(new ChatComponent(this.usersService, this.chatService))
    this.userName = this.socketService.getUsernameToken();

    console.log(this.userName)
    this.getOnlineUsers();
    this.socketService.connectToChat(sessionStorage.getItem("username"))

    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
  }


  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getChat(obj) {
    this.hideElement = true;
    this.currentChat = obj;
    this.currentChat.newMessages = 0;
    this.getChatsUser(this.userName, obj.nombreUsuario)
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }


  public getOnlineUsers() {
    this.usersService.obtenerUsuarios().subscribe(res => {
      this.chats = res;
      console.log(res)
      this.chats.forEach((item, index) => {
        if (item.nombreUsuario === this.userName) this.chats.splice(index, 1);
      });
    })
  }

  //eliminar metodo
  public registrar() {
    this.usersService.registration(this.userName).subscribe(res => {
      this.socketService.connectToChat(this.userName);
    },
      error => {
        if (error.status === 400) {
          console.log
        }
      });
    //this.getOnlineUsers();
  }

  public sendMs(text) {
    let date = new Date()
    this.newMessage = "";
    this.talks.push(new ChatMessage("", "smsSocket.chatId", "smsSocket.senderId", "smsSocket.recipientId", this.userName,
      this.currentChat.nombreUsuario, text, date, "smsSocket.status"));
    this.socketService.sendMsg(text, this.currentChat);
  }

  handleMessage(message) {
    if(message.senderName == this.currentChat.nombreUsuario){
      this.talks.push(message);
    }else{
      this.chats.forEach(element => {
        if(element.nombreUsuario == message.senderName){
          element.newMessages = element.newMessages + 1;
        }
      });
    }
    console.log(this.chats)
    console.log(this.talks)
  }

  getChatsUser(senderUsername: string, recipienUsername: string) {
    this.talks = []
    this.chatService.getChats(senderUsername, recipienUsername).subscribe(res => {
      if (res != null) {
        this.talks = res;
        console.log
      }
    })
  }

}
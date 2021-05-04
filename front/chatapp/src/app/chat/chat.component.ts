import { Component, OnInit, HostListener, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UserSession } from '../model/UserSession';
import { Socket } from '../socket/Socker';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../model/ChatMessage';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [SessionsService, ChatService]
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<UserSession> = [];
  public talks: Array<ChatMessage> = [];
  public sidenavOpen: boolean = true;
  public currentChat: UserSession;
  public newMessage: string;
  public userName: string;
  public hideElement: boolean = false;
  socketService: Socket;
  static instance: ChatComponent;
  public currerntSession: UserSession = new UserSession();

  constructor(private sessionService: SessionsService, private chatService: ChatService) {
    this.currentChat = new UserSession();
    this.talks = [];
    if (ChatComponent.instance) {
      return ChatComponent.instance;
    }

    ChatComponent.instance = this;
  }

  ngOnInit() {
    this.talks = [];
    this.socketService = new Socket(new ChatComponent(this.sessionService, this.chatService))
    this.currerntSession = this.socketService.getUserSessionDataToken();
    console.log(this.currerntSession)
    this.registerToChat();
    //this.socketService.connectToChat(sessionStorage.getItem("username"))

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
    console.log(this.currerntSession.userName,obj.userNam )
    this.getChatsUser(this.currerntSession.userName, obj.userName)
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }


  public getOnlineUsers() {
    this.sessionService.getSessions().subscribe(res => {
      this.chats = res;
      this.chats.forEach((item, index) => {
        if (item.userName === this.currerntSession.userName) this.chats.splice(index, 1);

      });
      this.chats.forEach(element => {
        element.newMessages = 0;
      });
    })
  }

  public registerToChat() {
    this.sessionService.registerSessions(this.currerntSession).subscribe(res => {
      this.socketService.connectToChat();
      this.getOnlineUsers();
    },
      error => {
        console.log(error)
        if (error.status === 400) {
          console.log
        }
      });
  }

  public sendMs(text) {
    let date = new Date()
    this.newMessage = "";
    this.talks.push(new ChatMessage("", "smsSocket.chatId", "smsSocket.senderId", "smsSocket.recipientId", this.currerntSession.userName,
      this.currentChat.userName, text, date, "smsSocket.status"));
    this.socketService.sendMsg(text, this.currentChat);
  }

  handleMessage(message) {
    if (message.senderName == this.currentChat.userName) {
      this.talks.push(message);
    } else {
      this.chats.forEach(element => {
        if (element.userName == message.senderName) {
          element.newMessages += 1;
        }
      });
    }
  }


  handleMessageSessions(message) {

    this.chats = message;
    this.chats.forEach((item, index) => {
      if (item.userName === this.currerntSession.userName) this.chats.splice(index, 1);

    });
    this.chats.forEach(element => {
      element.newMessages = 0;
    });
  }

  getChatsUser(senderUsername: string, recipienUsername: string) {
    this.talks = []
    this.chatService.getChats(senderUsername, recipienUsername).subscribe(res => {
      if (res != null) {
        this.talks = res;
      }
    })
  }

  updateStatusSession(status: string) {
    this.currerntSession.status = status;
    this.sessionService.updateStatusSession(this.currerntSession.userName, status).subscribe(res => {
      console.log(res)
    })
  }

}
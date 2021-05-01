import { Component, OnInit, HostListener, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatService2 } from '../services/chat.service';
import { Chat } from '../model/chat.model';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UsersService]
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<Chat> = [];
  public talks: Array<Chat> = [];
  public sidenavOpen: boolean = true;
  public currentChat: Chat;
  public newMessage: string;
  public userName: string;

  chatService2: ChatService2
  static instance: ChatComponent;

  constructor(private usersService: UsersService) {

    if (ChatComponent.instance) {
      return ChatComponent.instance;
    }

    ChatComponent.instance = this;
  }

  ngOnInit() {
    this.chatService2 = new ChatService2(new ChatComponent(this.usersService))
    console.log(this.chatService2.talk)
    this.getOnlineUsers();
    this.chatService2.connectToChat(sessionStorage.getItem("username"))
    //this.chats = this.chatService.getChats();
    if (window.innerWidth <= 768) {
      this.sidenavOpen = false;
    }
  }


  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 768) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getChat(obj) {
    this.currentChat = obj;
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }

  public sendMessage($event) {
    if (($event.which === 1 || $event.which === 13) && this.newMessage.trim() != '') {
      if (this.talks) {
        this.talks.push(
          new Chat(
            'assets/img/users/user.jpg',
            'Emilio Verdines',
            'online',
            this.newMessage,
            new Date(),
            true)
        )
        this.newMessage = '';
        let chatContainer = document.querySelector('.chat-content');
        if (chatContainer) {
          setTimeout(() => {
            var nodes = chatContainer.querySelectorAll('.mat-list-item');
            let newChatTextHeight = nodes[nodes.length - 1];
            chatContainer.scrollTop = chatContainer.scrollHeight + newChatTextHeight.clientHeight;
          });
        }
      }
    }
  }

  public ngOnDestroy() {
    if (this.talks)
      this.talks.length = 2;
  }

  public getOnlineUsers() {
    this.usersService.fetchAll().subscribe(res => {
      console.log(res)
      this.chats = res;
      this.chats.forEach((item, index) => {
        if (item.author === sessionStorage.getItem("username")) this.chats.splice(index, 1);
      });
    })
  }

  public registrar() {
    sessionStorage.setItem("username", this.userName)
    this.usersService.registration(this.userName).subscribe(res => {
      this.chatService2.connectToChat(this.userName);
    },
      error => {
        if (error.status === 400) {
          console.log
        }
      });
    this.getOnlineUsers();

  }

  public sendMs(text) {
    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();

    console.log(text)

    this.talks.push(new Chat("", sessionStorage.getItem("username"), "", text, new Date(year, month, day - 2, hour, minute), true));
    this.chatService2.sendMsg(sessionStorage.getItem("username"), text, this.currentChat.author);
  }

  handleMessage(message) {
    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();
    console.log(message)
    this.talks.push(new Chat("", message.author, "", message.text, new Date(year, month, day - 2, hour, minute), false))
    console.log(this.talks)
  }
}
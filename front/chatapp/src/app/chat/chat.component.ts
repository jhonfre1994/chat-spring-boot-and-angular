import { Component, OnInit, HostListener, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ChatService2 } from '../services/chat.service';
import { Chat } from '../model/chat.model';
import { UsersService } from '../services/users.service';
import { Messages } from '../model/messages';
import { UsuarioListDTO } from '../model/UsuarioListDTO';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UsersService]
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public userImage = 'assets/img/users/user.jpg';
  public chats: Array<UsuarioListDTO> = [];
  public talks: Array<Messages> = [];
  public sidenavOpen: boolean = true;
  public currentChat: UsuarioListDTO;
  public newMessage: string;
  public userName: string;

  chatService2: ChatService2
  static instance: ChatComponent;

  constructor(private usersService: UsersService) {
    this.currentChat = new UsuarioListDTO();
    this.talks = [];
    if (ChatComponent.instance) {
      return ChatComponent.instance;
    }

    ChatComponent.instance = this;
  }

  ngOnInit() {
    //this.registrar();
    this.chatService2 = new ChatService2(new ChatComponent(this.usersService))
    this.userName = this.chatService2.getUsernameToken();

    console.log(this.userName)
    this.getOnlineUsers();
    this.chatService2.connectToChat(sessionStorage.getItem("username"))

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


  public getOnlineUsers() {
    this.usersService.obtenerUsuarios().subscribe(res => {
      //console.log(res)
      this.chats = res;
      this.chats.forEach((item, index) => {
        if (item.nombreUsuario === this.userName) this.chats.splice(index, 1);
      });
    })
  }

  public registrar() {
    this.usersService.registration(this.userName).subscribe(res => {
      this.chatService2.connectToChat(this.userName);
    },
      error => {
        if (error.status === 400) {
          console.log
        }
      });
    //this.getOnlineUsers();
  }

  public sendMs(text) {
    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();

    console.log(text)

    this.talks.push(new Messages(sessionStorage.getItem("username"), text, new Date(year, month, day - 2, hour, minute), true));
    this.chatService2.sendMsg(sessionStorage.getItem("username"), text, this.currentChat);
  }

  handleMessage(message) {
    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();
    console.log(message)
    this.talks.push(new Messages(message.author, message.text, new Date(year, month, day - 2, hour, minute), false))
    console.log(this.talks)
  }

}
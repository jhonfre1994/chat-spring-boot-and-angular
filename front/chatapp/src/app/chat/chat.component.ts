import { Component, OnInit } from '@angular/core';
import { Chat } from '../model/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public chats: Array<Chat> = [];
  public selectedChat: Chat;
  constructor() {
    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = date.getMinutes();

    this.chats = [
      new Chat(
        'assets/img/profile/ashley.jpg',
        'Jhon Salamanca',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/bruno.jpg',
        'Bruno Vespa',
        'Do not disturb',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/julia.jpg',
        'Julia Aniston',
        'Away',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/adam.jpg',
        'Adam Sandler',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/tereza.jpg',
        'Tereza Stiles',
        'Offline',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/michael.jpg',
        'Michael Blair',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/ashley.jpg',
        'Ashley Ahlberg',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/bruno.jpg',
        'Bruno Vespa',
        'Do not disturb',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/julia.jpg',
        'Julia Aniston',
        'Away',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/adam.jpg',
        'Adam Sandler',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/tereza.jpg',
        'Tereza Stiles',
        'Offline',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/michael.jpg',
        'Michael Blair',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/ashley.jpg',
        'Ashley Ahlberg',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/bruno.jpg',
        'Bruno Vespa',
        'Do not disturb',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/julia.jpg',
        'Julia Aniston',
        'Away',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/adam.jpg',
        'Adam Sandler',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/tereza.jpg',
        'Tereza Stiles',
        'Offline',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      ),
      new Chat(
        'assets/img/profile/michael.jpg',
        'Michael Blair',
        'Online',
        'Great, then I\'ll definitely buy this theme. Thanks!',
        new Date(year, month, day - 2, hour, minute),
        false
      )
    ]

  }

  ngOnInit(): void {
  }

}

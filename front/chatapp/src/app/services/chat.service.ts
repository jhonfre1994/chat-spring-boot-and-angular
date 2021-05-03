import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../model/ChatMessage';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getChats(senderUsername: string, recipienUsername: string):Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(this.url + "/messages/"+ senderUsername + "/" + recipienUsername)
  }
}

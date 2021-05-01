import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  registration(userName: string) {
    return this.http.get(this.url + "/registration/" + userName)
  }

  fetchAll(): Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(this.url + "/fetchAllUsers")
  }
}

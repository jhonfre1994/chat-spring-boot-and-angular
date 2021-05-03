import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSession } from '../model/UserSession';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  public url = 'http://localhost:8080';
  public oauthUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  registerToChat(userSession: UserSession) {
    return this.http.post(this.url, userSession);
  }

  /* obtenerUsuarios(): Observable<UserSession[]> {
    return this.http.get<UserSession[]>(this.oauthUrl + "/api/v.1/usuarios/")
  } */

  getSessions(): Observable<UserSession[]> {
    return this.http.get<UserSession[]>(this.url + "/api/v.1/sessions")
  }

  registerSessions(userSession: UserSession): Observable<string> {
    return this.http.post<string>(this.url + "/api/v.1/sessions", userSession);
  }

  updateStatusSession(userName: string, status: string) {
    const headerDict = {
      'Content-Type': 'application/json'
    }
    return this.http.put(this.url + "/api/v.1/sessions/" + userName + "/" + status, headerDict);
  }
}


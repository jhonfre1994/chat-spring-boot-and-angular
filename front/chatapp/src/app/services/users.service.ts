import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioListDTO } from '../model/UsuarioListDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public url = 'http://localhost:8080';
  public oauthUrl = 'http://localhost:8081';


  constructor(private http: HttpClient) { }


  registration(userName: string) {
    return this.http.get(this.url + "/registration/" + userName)
  }

  obtenerUsuarios(): Observable<UsuarioListDTO[]> {
    return this.http.get<UsuarioListDTO[]>(this.oauthUrl + "/api/v.1/usuarios/")
  }

}

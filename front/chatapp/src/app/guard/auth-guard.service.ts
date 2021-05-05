import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  token = localStorage.getItem("access_token");

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }


  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (this.isLoggin()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  isLoggin(): boolean {
    const token = sessionStorage.getItem("access_token");
    if (this.jwtHelper.isTokenExpired(token) || token == undefined) {
      return true;
    }

    return false;
  }


}

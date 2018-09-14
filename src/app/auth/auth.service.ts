import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {globals} from '../globals';
import {Credentials} from './credentials';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private http: HttpClient, private router: Router) {
  }

  login(credentials: Credentials) {
    return this.http.post(environment.api + '/login', credentials, {responseType: 'text', observe: 'response'});
  }

  logout(): void {
    localStorage.removeItem(globals.localStorageKeys.accessToken);
    this.router.navigateByUrl('login');
  }

  loggedIn(): boolean {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

  hasAnyRole(roles: Array<string>): boolean {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const userRoles: string[] = this.jwtHelperService.decodeToken(token).roles.split(',');
    return roles.some(role => userRoles.includes(globals.roleAuthorityPrefix + role));
  }

  getSubject(): string {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return null;
    }
    return this.jwtHelperService.decodeToken(token).sub;
  }
}

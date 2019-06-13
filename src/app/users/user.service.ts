import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {User} from './user';
import {AppConfig} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private appConfig: AppConfig) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.appConfig.api}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.appConfig.api}/users`, user);
  }

  replaceUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.appConfig.api}/users/${user.id}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.appConfig.api}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/users/${userId}`);
  }
}

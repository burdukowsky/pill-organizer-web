import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.api}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/users`, user);
  }

  replaceUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/${user.id}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.api}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.api}/users/${userId}`);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  updateAccount(newPassword: string): Observable<any> {
    return this.http.patch<any>(`${environment.api}/account`, {password: newPassword});
  }
}

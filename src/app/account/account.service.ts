import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {AppConfig} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
              private appConfig: AppConfig) {
  }

  updateAccount(newPassword: string): Observable<any> {
    return this.http.patch<any>(`${this.appConfig.api}/account`, {password: newPassword});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Pill} from './pill';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PillService {

  constructor(private http: HttpClient) {
  }

  getPills(): Observable<Array<Pill>> {
    return this.http.get<Array<Pill>>(`${environment.api}/pills`);
  }
}
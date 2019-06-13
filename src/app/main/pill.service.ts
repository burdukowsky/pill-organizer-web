import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Pill} from './pill';
import {AppConfig} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PillService {

  constructor(private http: HttpClient,
              private appConfig: AppConfig) {
  }

  getPills(): Observable<Array<Pill>> {
    return this.http.get<Array<Pill>>(`${this.appConfig.api}/pills`);
  }

  createPill(pill: Pill): Observable<Pill> {
    return this.http.post<Pill>(`${this.appConfig.api}/pills`, pill);
  }

  updatePill(pill: Pill): Observable<Pill> {
    return this.http.put<Pill>(`${this.appConfig.api}/pills/${pill.id}`, pill);
  }

  deletePill(pillId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/pills/${pillId}`);
  }
}

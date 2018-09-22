import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Place} from './place';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getPlaces(): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(`${environment.api}/places`);
  }

  deletePillPlace(placeId: number, pillId: number): Observable<any> {
    return this.http.delete(`${environment.api}/places/${placeId}/pills/${pillId}`);
  }
}

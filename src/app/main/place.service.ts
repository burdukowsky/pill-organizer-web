import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Place} from './place';
import {PillPlace} from './pill-place';
import {AppConfig} from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient,
              private appConfig: AppConfig) {
  }

  getPlaces(): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(`${this.appConfig.api}/places`);
  }

  deletePillPlace(placeId: number, pillId: number): Observable<any> {
    return this.http.delete(`${this.appConfig.api}/places/${placeId}/pills/${pillId}`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${this.appConfig.api}/places`, place);
  }

  createPillPlace(pillPlace: PillPlace): Observable<Place> {
    return this.http.post<Place>(`${this.appConfig.api}/places/${pillPlace.place.id}/pills`, pillPlace.pill);
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.appConfig.api}/places/${place.id}`, place);
  }

  deletePlace(placeId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/places/${placeId}`);
  }
}

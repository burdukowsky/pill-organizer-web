import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Place} from './place';
import {environment} from '../../environments/environment';
import {PillPlace} from './pill-place';

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

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${environment.api}/places`, place);
  }

  createPillPlace(pillPlace: PillPlace): Observable<Place> {
    return this.http.post<Place>(`${environment.api}/places/${pillPlace.place.id}/pills`, pillPlace.pill);
  }
}

import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  private http: HttpClient;

  api: string;

  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  init(): Promise<any> {
    return this.http.get('assets/config.json').pipe(
      tap((appConfig: AppConfig) => this.api = appConfig.api)
    ).toPromise();
  }

}

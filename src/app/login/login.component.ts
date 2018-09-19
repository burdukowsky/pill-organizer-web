import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {Credentials} from '../auth/credentials';
import {AuthService} from '../auth/auth.service';
import {globals} from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = {username: '', password: ''};
  returnUrl: string;
  errorMessage: boolean;
  private _error = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._error.subscribe((state) => this.errorMessage = state);
    this._error.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorMessage = false);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.loggedIn()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  onSubmit() {
    this.credentials.username = this.credentials.username.trim();
    this.credentials.password = this.credentials.password.trim();
    this.authService.login(this.credentials).subscribe(
      (response: HttpResponse<any>) => {
        const authorizationHeader: string = response.headers.get('Authorization');
        localStorage.setItem(globals.localStorageKeys.accessToken, authorizationHeader.split(' ')[1]);
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this._error.next(true);
        console.error(error);
      }
    );
  }
}

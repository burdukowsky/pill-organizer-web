import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      const roles = next.data['roles'] as Array<string>;
      const result = (roles === undefined || this.authService.hasAnyRole(roles));
      if (!result) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }
    localStorage.removeItem(globals.localStorageKeys.accessToken);
    this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

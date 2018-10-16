import {Component, OnInit} from '@angular/core';
import {faSignOutAlt, faPills, faMedkit, faSearch, faUsers} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  faSignOutAlt = faSignOutAlt;
  faPills = faPills;
  faMedkit = faMedkit;
  faSearch = faSearch;
  faUsers = faUsers;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getSubject();
  }

  logout() {
    this.authService.logout();
  }
}

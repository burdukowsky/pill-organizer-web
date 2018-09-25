import {Component, OnInit} from '@angular/core';
import {faSignOutAlt, faPills, faMedkit, faSearch} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getSubject();
  }

  logout() {
    this.authService.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;
  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getSubject();
  }

  logout() {
    this.authService.logout();
  }
}

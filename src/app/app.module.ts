import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule} from 'ngx-bootstrap/modal';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {globals} from './globals';
import {environment} from '../environments/environment';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './layout-elements/header/header.component';

export function tokenGetter() {
  return localStorage.getItem(globals.localStorageKeys.accessToken);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiWithoutProtocol]
      }
    }),
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    FilterPipeModule,
    FontAwesomeModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

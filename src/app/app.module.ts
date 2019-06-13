import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {globals} from './globals';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './layout-elements/header/header.component';
import {PillsComponent} from './pills/pills.component';
import {PlacesComponent} from './places/places.component';
import {UsersComponent} from './users/users.component';
import {AccountComponent} from './account/account.component';
import {AppConfig} from './app-config.service';

export function getUrlHost(url: string): string {
  const pathArray = url.split('/');
  return pathArray[2];
}

export function AppConfigFactory(appConfig: AppConfig) {
  return () => appConfig.init();
}

export function tokenGetter(): string {
  return localStorage.getItem(globals.localStorageKeys.accessToken);
}

export function JwtOptionsFactory(appConfig: AppConfig) {
  return {
    tokenGetter: tokenGetter,
    whitelistedDomains: [getUrlHost(appConfig.api)]
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    PillsComponent,
    PlacesComponent,
    UsersComponent,
    AccountComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: JwtOptionsFactory,
        deps: [AppConfig]
      }
    }),
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    FilterPipeModule,
    FontAwesomeModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigFactory,
      deps: [AppConfig],
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PillsComponent} from './pills/pills.component';
import {PlacesComponent} from './places/places.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: MainComponent, canActivate: [AuthGuard], data: {roles: ['VIEWER']}},
      {path: 'pills', component: PillsComponent, canActivate: [AuthGuard], data: {roles: ['VIEWER']}},
      {path: 'places', component: PlacesComponent, canActivate: [AuthGuard], data: {roles: ['VIEWER']}}
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatCardModule } from '@angular/material/card';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/auth.guard';
//UI interface
import { UserProfileComponent } from '../ui/user-profile/user-profile.component';
import { PageNotFoundComponent } from '../ui/page-not-found/page-not-found.component';
import { LoginComponent } from '../ui/login/login.component';
import { GamesListComponent } from '../ui/games-list/games-list.component';

import { ConsoleDisplayComponent } from '../console-display/console-display.component';


const appRoutes: Routes = [
  {
    path: '',
    component: GamesListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent, canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatCardModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule

  ],
  exports: [RouterModule],
  declarations: [
    ConsoleDisplayComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    LoginComponent,
    GamesListComponent,
  ]
})
export class AppRoutingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule
    };
  }
}

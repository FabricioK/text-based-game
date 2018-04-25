import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { RoomComponent } from './room/room.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    MatToolbarModule,
    MatCardModule,
    HttpModule,
    CoreModule,
    AppRoutingModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
  ]
  ,bootstrap: [AppComponent]
})
export class AppModule { }

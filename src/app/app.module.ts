import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {UserService} from "./services/user.service";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import{appRoutes} from "./routes/routes";
import { SignUpComponent } from './user/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

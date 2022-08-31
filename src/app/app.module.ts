import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {UserService} from "./services/user.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import{appRoutes} from "./routes/routes";
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteComponent } from './user/delete/delete.component';
import {LoginComponent} from "./user/login/login.component";
import { StartingPageComponent } from './user/starting-page/starting-page.component';
import {JwtInterceptorProvider} from "./helpers/jwt.interceptor";
import { ApproveComponent } from './user/approve/approve.component';
import { WaitingComponent } from './user/waiting/waiting.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    DeleteComponent,
    LoginComponent,
    StartingPageComponent,
    ApproveComponent,
    WaitingComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [JwtInterceptorProvider, UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

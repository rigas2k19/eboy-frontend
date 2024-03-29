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
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { UserItemsComponent } from './user/user-items/user-items.component';
import { ShowItemComponent } from './item/show-item/show-item.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { SearchFilterPipe } from './search/search-filter.pipe';
import {MatInputModule} from "@angular/material/input";
import { MessagesComponent } from './messages/messages.component';
import { ReceivedComponent } from './messages/received/received.component';
import { SentComponent } from './messages/sent/sent.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ItemsBoughtComponent } from './user/items-bought/items-bought.component';

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
    ItemComponent,
    AddItemComponent,
    UserItemsComponent,
    ShowItemComponent,
    SearchComponent,
    SearchFilterPipe,
    MessagesComponent,
    ReceivedComponent,
    SentComponent,
    ItemsBoughtComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [JwtInterceptorProvider, UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

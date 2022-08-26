import { Component } from '@angular/core';
import {User} from "./model/user";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {Role} from "./model/role";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eboy-frontend';
/*
  user: User = new User();
  users: User[] = [];

  constructor(private service: UserService, private authenticationService: AuthenticationService){
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(){ }

  activeForm: boolean = true;

  deActivateForm(): void{
    this.activeForm = false;
  }

  get isAdmin() {
    return this.user && this.user.roles!.has('ROLE_ADMIN');
  }

  logout() {
    this.authenticationService.logout();
  }*/

}

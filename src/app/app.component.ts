import { Component } from '@angular/core';
import {User} from "./model/user";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eboy-frontend';

  constructor(public authService: AuthenticationService){ }

}

import { Component } from '@angular/core';
import {User} from "./model/user";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eboy-frontend';

  users: User[] = [];

  constructor(private service: UserService){ }

  ngOnInit(){
    //this.users = this.service.getUsers();
  }

  activeForm: boolean = true;

  deActivateForm(): void{
    this.activeForm = false;
  }

}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  constructor(private service: UserService) { }

  ngOnInit(): void {}

  addUser(): void{
    this.service.addUser(this.user).subscribe(user => this.user);
  }

}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  confirm_password: String = "";

  constructor(private service: UserService){ }

  ngOnInit(): void { }

  addUser(): void{
    this.service.addUser(this.user).subscribe(user => this.user);
    this.router.navigate(['login']);
  }
}

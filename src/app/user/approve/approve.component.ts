import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  users: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(users => this.users = users)
  }

  approveUser(user: User): void{
   // this.service.approveUser(user).subscribe(user => this.users);
    this.service.approveUser({username:user.username,
      password:user.password,
      name:user.name,
      lastname:user.lastname,
      email:user.email,
      phone:user.phone,
      address:user.address,
      location:user.location,
      afm:user.afm,
      roles: user.roles,
      approved: true}).subscribe()
  }

}

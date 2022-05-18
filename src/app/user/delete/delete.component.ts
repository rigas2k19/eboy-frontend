import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  users: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(users => this.users = users)
  }

  deleteUser(uname: string): void{
    this.service.deleteUser(uname).subscribe(user => this.users);
  }

}

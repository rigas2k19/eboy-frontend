import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public user: User = new User();
  public approved?: boolean ;

  model: any = {};
  loading = false;

  constructor(private service: UserService, private fb: FormBuilder, private http: HttpClient, private router: Router,private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:[''],
      password:['']
    })
  }

  login() {
    let approve: boolean | undefined;
    this.loading = true;
    this.service.isApproved(this.model.username).subscribe((user: User) => {
      if (user) {
        this.approved = user.approved;
        approve = this.approved;
        console.log(this.approved);
      }
      console.log(approve);
      if (!this.approved) {
        // if user is not approved
        this.router.navigate(['/waiting']);
      }
      else {
        // login user and generate token
        this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigate(['/StartingPage'])
                .then(() => {
                    window.location.reload();
                  }
                );
              // save username to localstorage
              localStorage.setItem('username', this.model.username);
            }
          );
      }
    });  //find user
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  model: any = {};
  loading = false;
  //private readonly TOKEN_NAME = 'token';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:[''],
      password:['']
    })
  }

  login(){
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        response => {
          console.log(response);
          //localStorage.setItem(this.TOKEN_NAME, response.token);  // keep token in local storage
          this.router.navigate(['/StartingPage']); }
      );
  }
}

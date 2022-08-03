import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:[''],
      password:['']
    })
  }

  login(){
    this.http.get<any>("http://localhost:8080/users")
      .subscribe(res=>{
        // returns the user that matches this username and password
        const user = res.find((a:any)=>{
          return a.username === this.loginForm.value.username &&
            a.password === this.loginForm.value.password;
        })
        // if this user exists
        if(user){
          this.loginForm.reset();
          this.router.navigate(['StartingPage']); // for regular users
          // we need a check for admin
        }
        else{
          alert("User not found");
          this.loginForm.reset();
        }
    }, error => {
        alert("Something went wrong :(");
      })
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../model/role";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  signupform!: FormGroup;
  submitted = false;

  constructor(private service: UserService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signupform = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['',[Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      location: ['', [Validators.required]],
      afm: ['', [Validators.required,Validators.minLength(9), Validators.maxLength(9)]]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  get username(){return this.signupform.get('username');}

  get password(){return this.signupform.get('password');}

  get confirm_password(){return this.signupform.get('confirm_password');}

  get fname(){return this.signupform.get('fname');}

  get lname(){return this.signupform.get('lname');}

  get email(){return this.signupform.get('email');}

  get phone(){return this.signupform.get('phone');}

  get address(){return this.signupform.get('address');}

  get location(){return this.signupform.get('location');}

  get afm(){return this.signupform.get('afm');}

  get form(){return this.signupform.controls;}

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupform.invalid) {
      return;
    }


    let roleset = [];
    roleset.push("ROLE_USER");

    //else user info is valid and we want to add user to database
    this.service.addUser({
     username:this.username!.value,
      password:this.password!.value,
      name:this.fname!.value,
      lastname:this.lname!.value,
      email:this.email!.value,
      phone:this.phone!.value,
      address:this.address!.value,
      location:this.location!.value,
      afm:this.afm!.value,
      roles: roleset
    }).subscribe();

    this.router.navigate(['login']);
  }

/*
  addUser(): void{
    this.user.admin = false;  // for every user ( but not admin )
    this.service.addUser(this.user).subscribe(user => this.user);
    this.router.navigate(['login']);
  }
*/

}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

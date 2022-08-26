/*import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../model/user";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`https://localhost:8443/auth/login`, { username, password },{ withCredentials: true })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    //this.userSubject.next(null);   enimeronei oti o xristis aposundethike
    this.router.navigate(['/login']);
  }
}*/


//χαμοδρακας:

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login} from 'src/app/model/login';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<string>> {
    const ln: Login = { username, password };
    console.log(this.http.post<string>('https://localhost:8443/auth/login', ln).subscribe(data=>{
      console.log(data);
    }));
    return this.http.post<string>('https://localhost:8443/auth/login', ln, { observe: 'response'});
  }

  logout(): void {
    // remove token from local storage to log user out
    localStorage.removeItem('token');
  }
}


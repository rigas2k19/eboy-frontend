import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
import {ApiService} from "./api.service";
import {User} from 'src/app/model/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private readonly TOKEN_NAME = 'token';
  user: User | null;

  get token() : any{
    return localStorage.getItem(this.TOKEN_NAME);
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);
  }


  getUser(token: string): User | null {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        console.log(response.accessToken);
        localStorage.setItem(this.TOKEN_NAME, response.accessToken);  // keep token in local storage
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
   this.router.navigate(['/login']);
  }
}



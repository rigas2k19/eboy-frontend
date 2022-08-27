import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
import {ApiService} from "./api.service";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  private readonly TOKEN_NAME = 'token';

  get token() : any{
    return localStorage.getItem(this.TOKEN_NAME);
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this._isLoggedIn$.next(!!this.token);
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
    //this.userSubject.next(null);   enimeronei oti o xristis aposundethike
   this.router.navigate(['/login']);
  }
}



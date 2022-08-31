
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.method == "POST" && request.url == 'https://localhost:8443/signup'){
      console.log(request);
      return next.handle(request);
    }
    request = request.clone({	// create a new request
      headers: request.headers.set('Authorization','Bearer ' + this.authService.token),
    });
    console.log(request);
    return next.handle(request);
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};


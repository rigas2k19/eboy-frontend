import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):| Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthorized = this.authService.user?.roles.has(route.data.role);

    if (!isAuthorized) {
      // redirect
      // display a message
      window.alert('you are not authorized');
    }

    return isAuthorized || false;
  }

}

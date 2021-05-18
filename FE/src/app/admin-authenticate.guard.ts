import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AdminAuthenticationService } from './admin-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticateGuard implements CanActivate {

  constructor(
    private adminAuthenticationService: AdminAuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable<boolean>(obs => {
        this.adminAuthenticationService.isAuthenticated()
        .subscribe(
          data => {
            obs.next(true);
          },
          err => {
            this.router.navigateByUrl('/admin-login');
            obs.next(false);
          }
        )
      })
    return true;
  }
  
}

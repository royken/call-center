import { AuthService } from './../../services/auth.service';
/*import { AuthService } from './auth.service';*/
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';

@Injectable()
export class AuthGuard implements CanActivate {

  /*constructor(private authService: AuthService, private router: Router) { }*/

 /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/pages/login']);
    }
    else {
      return true;
    }
  }*/


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    //let isAuth = this.authService.checkLogin(url);
    //console.log("ISAUTH",isAuth);
    /*if(!isAuth){
      this.router.navigate(['/pages/login']);
    }
    else{
      return true;
    }
*/
    return this.checkLogin(url);
  }

  constructor(private authService: AuthService, private router: Router) {}

  checkLogin(url: string): boolean {
    let token = localStorage.getItem('token')
    console.log("isLoggedIN", this.authService.isLoggedIn);
    console.log("TOKEN", token);
    if (token != null) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/pages/login']);
    return false;
  }
}

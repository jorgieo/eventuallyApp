import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  load:boolean;
  user:any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.checkLogin();
  }

  checkLogin(){
    // use pipe to execute map on the user object returned and take to emmit only one value
     return this.afAuth.user.pipe(map((user) => {

      if(user){
        return true;
      }
      // if no user is returned, redirect to the login screen
      this.router.navigateByUrl('/')
      return false;
    }),
    take(1))
  }
}

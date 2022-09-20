import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authservice:AuthenticationService,private route:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree > | Promise<boolean | UrlTree>{
    if(this.authservice.isuserLoggedin==true){
      return true;
    }
   this.route.navigate(['login']);
    return false;
   }
  }

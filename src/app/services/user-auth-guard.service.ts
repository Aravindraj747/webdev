import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate{

  constructor(private userService: UsersService, private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree > | Promise<boolean | UrlTree>{
      if (this.userService.getAgentLogin() === 'true') {
          return true;
      }
      this.route.navigate(['login']);
      return false;
  }
}

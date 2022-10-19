import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';


@Injectable({
  providedIn: 'root'
})
export class AdminauthguardGuard implements CanActivate {
  constructor(private adminService: AdminService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.adminService.getAdminLogin() == 'true') {
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}

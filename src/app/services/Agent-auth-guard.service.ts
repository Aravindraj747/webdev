import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentService } from './agent.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AgentAuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private route: Router, private agentService: AgentService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.agentService.getAgentLogin() == 'true') {
      return true;
    }
    this.route.navigate(['agentlogin']);
    return false;
  }
}
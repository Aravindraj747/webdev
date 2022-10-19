import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent';

import { AgentService } from 'src/app/services/agent.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  agent: Agent;

  constructor(public authService: AuthenticationService, private route: Router, private agentService: AgentService) {
    this.agent=this.agentService.getAgentDetails();
    console.log(this.agent);
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.agentLogout().then(()=>{
      this.route.navigate(['agentlogin']);
    });
  }

  viewProfile(){
      this.route.navigate(['agentprofile']);
  }

  sellnow(){
    return this.route.navigate(['sellnow']);
  }
}

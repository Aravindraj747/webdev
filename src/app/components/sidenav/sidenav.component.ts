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

  constructor(public authservice: AuthenticationService, private route: Router, private agentservice: AgentService) { 
    this.agent=this.agentservice.agent;
  }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      this.route.navigate(['']);
    });
  }
  viewProfile(){
      this.route.navigate(['agentprofile']);
  }
}

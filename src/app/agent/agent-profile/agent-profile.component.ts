import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent implements OnInit {

  agent: Agent;

  constructor(private agentservice: AgentService) { 
    this.agent=this.agentservice.agent;
    console.log(this.agentservice.agent);
  }

  ngOnInit(): void {
  }
  
}

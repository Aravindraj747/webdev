import { Component, OnInit } from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {Agent} from "../../models/agent";

@Component({
  selector: 'app-sellnow',
  templateUrl: './sellnow.component.html',
  styleUrls: ['./sellnow.component.css']
})
export class SellnowComponent implements OnInit {

  agent: Agent;

  constructor(private agentService: AgentService) {
    this.agent = this.agentService.getAgentDetails();
  }

  ngOnInit(): void {
  }

}

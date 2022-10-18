import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Agent} from "../../models/agent";
import {AgentService} from "../../services/agent.service";
import {Insurance} from "../../models/insurance";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  agent: Agent;
  allPolicies: Insurance[] = [];
  constructor(private firestoreService: FirestoreService,
              private agentService: AgentService) {
    this.agent = agentService.getAgentDetails();
  }

  ngOnInit(): void {
    let policyArray: Insurance[] = []
    this.firestoreService.getPolicies(this.agent.agentID).get().then(res => {
      res.forEach(function (doc) {
        policyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.allPolicies = policyArray;
    });
  }

}

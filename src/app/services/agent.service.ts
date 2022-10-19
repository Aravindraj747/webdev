import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Agent } from "../models/agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  agent: Agent;

  isAgent: string = 'false';

  constructor(private firestore: AngularFirestore) { }

  getAgent(email: string) {
    this.firestore.collection('agent').doc<Agent>(email).get().subscribe(res => {
      this.agent = <Agent>res.data();
      console.log(res.data());
      this.isAgent = 'true';
      console.log('getisAgent', this.isAgent);
      sessionStorage.setItem('agentLogin', JSON.stringify(this.isAgent))
      sessionStorage.setItem('agentData', JSON.stringify(this.agent));
    });
  }

  getAgentDetails() {
    if (this.agent === undefined) {
      this.agent = JSON.parse(sessionStorage.getItem('agentData')!);
    }
    return this.agent;
  }

  getAgentLogin() {
    if (this.isAgent == undefined) {
      this.isAgent = JSON.parse(sessionStorage.getItem('agentLogin')!);
    }
    return this.isAgent;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Agent } from "../models/agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  agent: Agent;

  isAgent: string;

  constructor(private firestore: AngularFirestore) { }

  getAgent(email: string) {
    this.firestore.collection('agent').doc<Agent>(email).get().subscribe(res => {
      this.agent = <Agent>res.data();
      sessionStorage.setItem('agentLogin', this.isAgent);
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
    if (this.isAgent === undefined) {
      this.isAgent = sessionStorage.getItem('agentLogin')!;
    }
    return this.isAgent;
  }

  checkIfAgent(id:string){
    return this.firestore.collection('agent',ref=> ref.where("email", "==",id)).get();
  }
}

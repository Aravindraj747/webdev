import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Agent} from "../models/agent";
import {Insurance} from "../models/insurance";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  saveAgent(agent: Agent) {
    return this.firestore.collection('agent').doc(agent.agentID).set(agent);
  }

  getAgents() {
    return this.firestore.collection('agent');
  }

  saveInsurance(insurance: Insurance) {
    return this.firestore.collection('insurance').add(insurance);
  }
}

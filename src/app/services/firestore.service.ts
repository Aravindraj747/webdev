import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Insurance} from "../models/insurance";
import { Agent } from "../models/agent";
import {Property} from "../models/property";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  saveAgent(agent: Agent) {
    return this.firestore.collection('agent').doc(agent.email).set(agent);
  }

  getAgents() {
    return this.firestore.collection('agent');
  }

  saveInsurance(insurance: Insurance) {
    return this.firestore.collection('insurance').add(insurance);
  }

  getInsurance() {
    return this.firestore.collection('insurance');
  }

  saveProperty(property: Property) {
    return this.firestore.collection('property').add(property);
  }

  getProperty(type: string) {
    return this.firestore.collection('property', ref => ref.where('type', '==', type));
  }
}

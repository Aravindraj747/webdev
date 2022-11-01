import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Insurance} from "../models/insurance";
import { Agent } from "../models/agent";
import {Property} from "../models/property";
import {Claim} from "../models/claim";

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
    return this.firestore.collection('insurance').doc(insurance.id).set(insurance);
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

  updateInsurance(id: string, data: any) {
    return this.firestore.collection('insurance').doc(id).update(data);
  }

  getPropertyByFilter(type: string, price: string, location: string) {
    return this.firestore.collection('property', ref => {
      if (type !== undefined && type !== '') {
        ref.where('type', '==', type)
      }
      if (location !== undefined && location !== '') {
        ref.where('location', '==', location);
      }
      if (price !== undefined && price !== '0') {
        ref.where('amount', '<=', price)
      }
      return ref;
    })
  }

  getPolicies(id: string) {
    return this.firestore.collection('insurance').ref.where('createdByID', '==', id);
  }

  saveClaim(claim: Claim) {
    return this.firestore.collection('claim').doc(claim.id).set(claim);
  }

  getPoliciesByStatus(status: string) {
    return this.firestore.collection('insurance').ref.where( 'status', '==', status);
  }

  getAllPolicies() {
    return this.firestore.collection('insurance');
  }

  getPoliciesCreatedBy(createdBy: string) {
    return this.firestore.collection('insurance').ref.where('createdBy', '==', createdBy);
  }
}

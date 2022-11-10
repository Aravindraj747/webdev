import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentData} from "@angular/fire/compat/firestore";
import {Insurance} from "../models/insurance";
import { Agent } from "../models/agent";
import {Property} from "../models/property";
import {Claim} from "../models/claim";
import firebase from "firebase/compat";
import Query = firebase.database.Query;

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

  getPropertyByFilter(type: string, price: number, location: string) {
    return this.firestore.collection('property', ref => {
      // @ts-ignore
      let query: Query<DocumentData> = ref;
      if (type !== undefined && type !== '') {
        console.log('adding type', type);
        query = query.where('type', '==', type);
      }
      if (location !== undefined && location !== '') {
        query = query.where('address', '==', location);
      }
      if (price !== undefined) {
        query = query.where('amount', '<=', price)
      }
      console.log('ref', ref);
      console.log('query', query);
      return query;
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

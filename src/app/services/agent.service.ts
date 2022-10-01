import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Agent} from "../models/agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  agent: Agent;

  constructor(private firestore: AngularFirestore) { }

  getAgent(email: string) {
    this.firestore.collection('agent').doc<Agent>(email).get().subscribe(res => {
      this.agent = <Agent>res.data();
      console.log(res.data());
    });
  }
}
import { Component, OnInit } from '@angular/core';
import {Agent} from "../../models/agent";
import {Insurance} from "../../models/insurance";
import {FirestoreService} from "../../services/firestore.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  agent: Agent;
  agentPolicies: Insurance[] = [];
  userPolicies: Insurance[] = [];

  types:any[]=["Agent","User"];
  policies: Insurance[] = []

  constructor(private firestoreService: FirestoreService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    let policyArray: Insurance[] = []
    this.firestoreService.getPoliciesCreatedBy('Agent').get().then(res => {
      res.forEach(function (doc) {
        policyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.agentPolicies = policyArray;
      this.policies = this.agentPolicies;
    });

    let userPolicyArray: Insurance[] = []
    this.firestoreService.getPoliciesCreatedBy('User').get().then(res => {
      res.forEach(function (doc) {
        userPolicyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.userPolicies = userPolicyArray;
    });
  }

  openDialog(insurance: Insurance){
    return this.dialog.open(DialogComponent,{
      data: {
        insurance: insurance
      }
    });
  }

  filterPolicies(type: string) {
    if (type === 'Agent') {
      this.policies = this.agentPolicies;
    } else {
      this.policies = this.userPolicies;
    }
  }
}

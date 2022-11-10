import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DomSanitizer} from "@angular/platform-browser";
import {Insurance} from "../../models/insurance";
import {FirestoreService} from "../../services/firestore.service";
import {AgentService} from "../../services/agent.service";
import {Agent} from "../../models/agent";
import {Property} from "../../models/property";
import { AuthenticationService } from 'src/app/services/authentication.service';
import {ActivatedRoute} from "@angular/router";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {getSortHeaderNotContainedWithinSortError} from "@angular/material/sort/sort-errors";
import {InsuranceStatus} from "../../enum/insurance-status";

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {

    youtubeVideos: {url: any, title: string}[] = [];
    totalPolicies: Insurance[] = [];
    agent: Agent;
    totalAmount: number = 0;
    map: Map<String, number>;
    amountMap: Map<String, number>;

    ngOnInit(): void {
    }

    constructor(private firestore: AngularFirestore,
                private firestoreService: FirestoreService,
                private agentService: AgentService,
                private authService: AuthenticationService,
                private activateRoute: ActivatedRoute) {
        this.firestore.collection<{url: string, title: string}>("youtubeVideos").valueChanges()
            .subscribe(res => {
                console.log(res);
                this.youtubeVideos = res;
            })
        this.activateRoute.queryParams.subscribe(res => {
            this.agent = {
                accountNumber: "",
                address: "",
                agentID: "",
                bankAccountHolderName: "",
                bankCity: "",
                bankName: "",
                bankPinCode: "",
                city: "",
                creationDate: Timestamp.now(),
                email: "",
                ifscCode: "",
                name: "",
                password: "",
                phoneNumber: "",
                pinCode: "",
                state: ""
            }
            this.agent.email = res['email'];
            this.getPolicies();
        })
        this.agent = this.agentService.getAgentDetails();
        this.map = new Map<String, number>();
        this.amountMap = new Map<String, number>();
        console.log(this.map);
        console.log(this.agent);
        if (this.agent != null) {
            this.getPolicies();
        }
    }

    getPolicies() {
        let policyArray: Insurance[] = []
        this.firestoreService.getPolicies(this.agent.email).get().then(res => {
            res.forEach(function (doc) {
                policyArray.push(<Insurance>doc.data());
                console.log(doc.data());
            });
            this.totalPolicies = policyArray;
            this.totalPolicies.forEach(policy => {
                if (policy.vehicleType === 'twoWheeler') {
                    console.log('Two Wheeler', policy);
                }
                if (policy.insuranceAmount !== '' && policy.status === 'COMPLETED' && policy.currentState !== InsuranceStatus.REJECTED) {
                    this.totalAmount += parseInt(policy.insuranceAmount);
                }
                if (this.map.has(policy.vehicleType)) {
                    this.map.set(policy.vehicleType, 1 + this.map.get(policy.vehicleType)!);
                } else {
                    this.map.set(policy.vehicleType, 1);
                }

                if (this.amountMap.has(policy.vehicleType) && policy.insuranceAmount !== '' && policy.currentState !== InsuranceStatus.REJECTED) {
                    this.amountMap.set(policy.vehicleType, parseInt(policy.insuranceAmount) + this.amountMap.get(policy.vehicleType)!);
                } else if (policy.insuranceAmount !== '' && policy.currentState !== InsuranceStatus.REJECTED){
                    this.amountMap.set(policy.vehicleType, parseInt(policy.insuranceAmount));
                }
            });
            console.log(this.map);
            console.log(this.amountMap);

        });
    }
}

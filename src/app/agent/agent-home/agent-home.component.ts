import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DomSanitizer} from "@angular/platform-browser";
import {Insurance} from "../../models/insurance";
import {FirestoreService} from "../../services/firestore.service";
import {AgentService} from "../../services/agent.service";
import {Agent} from "../../models/agent";
import {Property} from "../../models/property";

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

    ngOnInit(): void {
    }

    constructor(private firestore: AngularFirestore,
                private firestoreService: FirestoreService,
                private agentService: AgentService) {
        this.firestore.collection<{url: string, title: string}>("youtubeVideos").valueChanges()
            .subscribe(res => {
                console.log(res);
                this.youtubeVideos = res;
            })
        this.agent = this.agentService.getAgentDetails();
        this.map = new Map<String, number>();
        console.log(this.map);
        console.log(this.agent);
        if (this.agent != null) {
            this.getPolicies();
        }
    }

    getPolicies() {
        let policyArray: Insurance[] = []
        this.firestoreService.getPolicies(this.agent.agentID).get().then(res => {
            res.forEach(function (doc) {
                policyArray.push(<Insurance>doc.data());
                console.log(doc.data());
            });
            this.totalPolicies = policyArray;
            this.totalPolicies.forEach(policy => {
                this.totalAmount += parseInt(policy.insuranceAmount);
                if (this.map.has(policy.policyType)) {
                    this.map.set(policy.policyType, 1 + this.map.get(policy.policyType)!);
                } else {
                    this.map.set(policy.policyType, 1);
                }
            });
            console.log(this.map);
        });
    }
}

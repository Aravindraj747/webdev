import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import { Agent } from "../../models/agent";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  agents: Agent[];

  constructor(private firestoreService: FirestoreService) {

  }

  ngOnInit(): void {
    const agentsArray: Agent[] = []
    this.firestoreService.getAgents().ref.get().then(res => {
      res.forEach(function(doc) {
        agentsArray.push(<Agent>doc.data());
      });
    });
    this.agents = agentsArray;
  }

}

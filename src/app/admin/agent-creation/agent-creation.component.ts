import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirestoreService} from "../../services/firestore.service";
import {Agent} from "../../models/agent";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-agent-creation',
  templateUrl: './agent-creation.component.html',
  styleUrls: ['./agent-creation.component.css']
})
export class AgentCreationComponent implements OnInit {

  signUpSpinnerActive: boolean = false;
  step = '1';

  agent: Agent = {
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
  constructor(private authService: AuthenticationService,
              private firestoreService: FirestoreService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  goToStep2() {
    this.step = '2';
  }

  goToStep3() {
    this.step = '3';
  }

  createAgent(){
    this.signUpSpinnerActive = true;
    this.authService.register(this.agent.name, this.agent.email, this.agent.password)
        .then(res => {
          this.agent.agentID = Math.floor(Date.now()/1000).toString();
          this.agent.creationDate = Timestamp.now();
          this.firestoreService.saveAgent(this.agent)
              .then(res => {
                console.log("Agent Saved");
                this.openSnackBar("Agent Created Successfully", "Close");
                this.signUpSpinnerActive = false;
              }, err => {
                this.openSnackBar("Error Occurred while saving agent", "Retry");
                this.signUpSpinnerActive = false;

              });
        }).catch(err => {
          console.log(err);
          this.signUpSpinnerActive = false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

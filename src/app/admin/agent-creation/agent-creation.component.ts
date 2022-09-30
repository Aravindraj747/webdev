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
  // get name(){
  //   return this.agentForm.get('name');
  // }
  // get email(){
  //   return this.agentForm.get('email');
  // }
  // get phoneNumber(){
  //   return this.agentForm.get('phoneNumber');
  // }
  // get password(){
  //   return this.agentForm.get('password');
  // }
  // get address() {
  //   return this.agentForm.get('address');
  // }
  // get state() {
  //   return this.agentForm.get('state');
  // }
  // get city() {
  //   return this.agentForm.get('city');
  // }
  // get pinCode() {
  //   return this.agentForm.get('pinCode');
  // }
  // get ifscCode() {
  //   return this.agentForm.get('ifscCode');
  // }
  // get bankAccountHolderName() {
  //   return this.agentForm.get('bankAccountHolderName');
  // }
  // get bankName() {
  //   return this.agentForm.get('bankName');
  // }
  // get accountNumber() {
  //   return this.agentForm.get('accountNumber');
  // }
  // get bankCity() {
  //   return this.agentForm.get('bankCity');
  // }
  // get bankPinCode() {
  //   return this.agentForm.get('bankPinCode');
  // }

  goToStep2() {
    this.step = '2';
  }

  goToStep3() {
    this.step = '3';
  }

  createAgent(){
    // const{ name, email, phoneNumber, password } = this.agentForm.value;

    // if (name === '') {
    //   this.openSnackBar('Enter the Name', 'Undo');
    //   return
    // }
    // if (email === '') {
    //   this.openSnackBar('Enter the Email', 'Undo');
    //   return;
    // }
    // if (phoneNumber === '') {
    //   this.openSnackBar('Enter the Phone number', 'undo');
    //   return;
    // }
    // if (password === '') {
    //   this.openSnackBar('Enter the Password', 'Undo')
    //   return;
    // }
    this.signUpSpinnerActive = true;
    this.authService.register(this.agent.name, this.agent.email, this.agent.password)
        .then(res => {
          this.agent.agentID = Math.floor(Date.now()/1000).toString();
          this.agent.creationDate = Timestamp.now();
          this.firestoreService.saveAgent(this.agent)
              .then(res => {
                console.log("Agent Saved");
                this.openSnackBar("User Created Successfully", "Close");
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

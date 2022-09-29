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

  agentForm=new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    phoneNumber: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  constructor(private authService: AuthenticationService,
              private firestoreService: FirestoreService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }
  get name(){
    return this.agentForm.get('name');
  }
  get email(){
    return this.agentForm.get('email');
  }
  get phonenumber(){
    return this.agentForm.get('phonenumber');
  }
  get password(){
    return this.agentForm.get('password');
  }

  createAgent(){
    const{name,email,phoneNumber,password}=this.agentForm.value;
    console.log(name,email,phoneNumber);

    if (name === '') {
      this.openSnackBar('Enter the Name', 'Undo');
      return
    }
    if (email === '') {
      this.openSnackBar('Enter the Email', 'Undo');
      return;
    }
    if (phoneNumber === '') {
      this.openSnackBar('Enter the Phone number', 'undo');
      return;
    }
    if (password === '') {
      this.openSnackBar('Enter the Password', 'Undo')
      return;
    }
    this.signUpSpinnerActive = true;
    this.authService.register(name, email, password)
        .then(res => {
          const agent: Agent = {
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            agentID: Math.floor(Date.now()/1000).toString(),
            creationDate:  Timestamp.now()
          }
          this.firestoreService.saveAgent(agent)
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

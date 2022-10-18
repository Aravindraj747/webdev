import { Component, OnInit } from '@angular/core';
import {Claim} from "../../models/claim";
import {FirestoreService} from "../../services/firestore.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claim: Claim = {
    createdBy: "",
    createdByID: "",
    createdByName: "",
    createdDate: Timestamp.now(),
    csrImage: "",
    customerName: "",
    emailID: "",
    id: "",
    phoneNumber: "",
    policyNumber: "",
    type: "",
    vehicleDamageImage: "",
    vehicleNumber: "",
    vehicleType: ""
  };
  spinnerActive = false;
  csrImageFile: any = {};
  vehicleImage: any = {};

  constructor(private firestoreService: FirestoreService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submitClaim() {
    this.spinnerActive = true;
    this.claim.createdDate = Timestamp.now();
    this.claim.id = Math.floor(Date.now()/1000).toString();

    this.firestoreService.saveClaim(this.claim).then(res => {
      this.openSnackBar('Claim Saved', 'Undo');
    }).catch(err => {
      this.openSnackBar('Error Occurred', 'Retry');
    }).finally(() => {
      this.spinnerActive = false;
    });
  }

  chooseCSR(event: any) {
    this.csrImageFile = event.target.files[0];
  }

  chooseVehicle(event: any) {
    this.vehicleImage = event.target.files[0];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000,
    });
  }
}

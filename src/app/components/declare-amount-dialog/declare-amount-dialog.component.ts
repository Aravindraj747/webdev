import {Component, Inject, OnInit} from '@angular/core';
import {Insurance} from "../../models/insurance";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirestoreService} from "../../services/firestore.service";
import {InsuranceStatus} from "../../enum/insurance-status";

@Component({
  selector: 'app-declare-amount-dialog',
  templateUrl: './declare-amount-dialog.component.html',
  styleUrls: ['./declare-amount-dialog.component.css']
})
export class DeclareAmountDialogComponent implements OnInit {

  insurance: Insurance;

  type: String;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private route: Router,
              private _snackBar: MatSnackBar,
              private firestoreService: FirestoreService) {
    console.log(data);
    this.insurance = data['insurance'];
    this.type=this.insurance.policyType;
    console.log(this.type);
  }
  

  ngOnInit(): void {
  }

  submit() {
    if(this.insurance.insuranceValue == undefined){
      this.insurance.insuranceValue='0';
    }
    let data = {
      'insuranceAmount': this.insurance.insuranceAmount,
      'currentState': InsuranceStatus.AMOUNT_DECLARED,
      'insuranceCompany': this.insurance.insuranceCompany,
      'insuranceValue' : this.insurance.insuranceValue,
    }
    this.firestoreService.updateInsurance(this.insurance.id, data).then(res => {
      this.openSnackBar('Insurance amount Saved', 'close');
    }).then(err => {
      this.openSnackBar('Insurance amount Saved', 'Retry');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000,
    });
  }
}

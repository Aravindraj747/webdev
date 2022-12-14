import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';
import {FirestoreService} from "../../services/firestore.service";
import {Insurance} from "../../models/insurance";
import {InsuranceStatus} from "../../enum/insurance-status";
import {DeclareAmountDialogComponent} from "../../components/declare-amount-dialog/declare-amount-dialog.component";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  types: any[] = ["ALL", "COMPLETED", "INCOMPLETE"];

  insurances: Insurance[] = [];
  selected: string = 'ALL';

  constructor(private authService: AuthenticationService,
              private route: Router,
              private firestoreService: FirestoreService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPolicies();
    console.log(this.insurances);
  }

  logout(){
    this.authService.logout().then(()=>{
      this.route.navigate(['admin']);
    });
  }

  getAllPolicies() {
    const insuranceArray: Insurance[] = []
    this.firestoreService.getAllPolicies().ref.get().then(res => {
      console.log(res);
      res.forEach(function(doc) {
        insuranceArray.push(<Insurance>doc.data());
      });
    });
    this.insurances = []
    this.insurances = insuranceArray;
    console.log(this.insurances);
  }

  filterPolicies(status: string) {
    this.selected = status;
    if (status === 'ALL') {
      this.getAllPolicies();
      return
    }
    const insuranceArray: Insurance[] = []
    this.firestoreService.getPoliciesByStatus(status).get().then(res => {
      console.log(res);
      res.forEach(function(doc) {
        insuranceArray.push(<Insurance>doc.data());
      });
    });
    this.insurances = []
    this.insurances = insuranceArray;
    console.log(this.insurances);
  }

  openDialog(insurance: Insurance) {
    if (insurance.currentState === InsuranceStatus.SUBMITTED) {
      return this.dialog.open(DeclareAmountDialogComponent, {
        data: {
          insurance: insurance
        }
      });
    } else {
      return this.dialog.open(DialogComponent, {
        data: {
          insurance: insurance
        }
      });
    }
  }
}

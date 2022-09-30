import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';
import {FirestoreService} from "../../services/firestore.service";
import {Insurance} from "../../models/insurance";
import {Agent} from "../../models/agent";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  types: any[] = ["ALL", "COMPLETED", "INCOMPLETE"];

  insurances: Insurance[] = [];

  constructor(private authService: AuthenticationService,
              private route: Router,
              private firestoreService: FirestoreService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    const insuranceArray: Insurance[] = []
    this.firestoreService.getInsurance().ref.get().then(res => {
      res.forEach(function(doc) {
        insuranceArray.push(<Insurance>doc.data());
      });
    });
    this.insurances = insuranceArray;
  }

  logout(){
    this.authService.logout().then(()=>{
      this.route.navigate(['admin']);
    });
  }
  openDialog(){
    return this.dialog.open(DialogComponent,{
    //   height: '200px',
    // width: '300x',
    });
  }
}

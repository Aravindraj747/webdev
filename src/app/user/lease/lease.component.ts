import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from "../../models/property";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  disableSelect = new FormControl(false);
  filterLocation: string;
  filterBHK: any;
  filterPrice: any;
  properties: Property[];

  constructor(private route: Router, private authservice: AuthenticationService,private firestoreService:FirestoreService) { }

  ngOnInit(): void {
    let propertyArray: Property[] = [];
    this.firestoreService.getProperty('Lease').get().subscribe(res => {
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }
  logout() {
    this.authservice.logout().then(() => {
      // this.login.isloggedin=false;
      this.route.navigate(['login']);
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }
    else {
      return value;
    }
  }

  clearAll(){
    window.location.reload();
  }

  filter() {
    console.log(this.filterBHK, this.filterLocation, this.filterPrice);
    this.properties = [];
    let propertyArray: Property[] = [];
    this.firestoreService.getPropertyByFilter('Lease', this.filterPrice, this.filterLocation).get().subscribe(res => {
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }
}

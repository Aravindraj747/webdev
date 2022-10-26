import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from "../../models/property";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {

  constructor(private authservice: AuthenticationService, 
              private route: Router,
              private firestoreService: FirestoreService) { }

  disableSelect = new FormControl(false);
  filterLocation: string;
  filterBHK: any;
  filterPrice: any;
  properties: Property[];

  ngOnInit(): void {
    let propertyArray: Property[] = [];
    this.firestoreService.getProperty('Commercial').get().subscribe(res => {
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
  filter() {
    console.log(this.filterBHK, this.filterLocation, this.filterPrice);
    this.properties = [];
    let propertyArray: Property[] = [];
    this.firestoreService.getPropertyByFilter('Commercial', this.filterPrice, this.filterLocation).get().subscribe(res => {
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }
}

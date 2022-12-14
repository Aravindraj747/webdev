import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from "../../services/firestore.service";
import { Property } from "../../models/property";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  disableSelect = new FormControl(false);
  properties: Property[];
  filterLocation: string;
  filterBHK: any;
  filterPrice: any;

  constructor(private authService: AuthenticationService,
    private route: Router,
    private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    let propertyArray: Property[] = [];
    this.firestoreService.getProperty('Buy').get().subscribe(res => {
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }

  logout() {
    this.authService.logout().then(() => {
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

  clearAll() {
    window.location.reload();
  }

  filter() {
    console.log(this.filterLocation, this.filterPrice);
    this.properties = [];
    let propertyArray: Property[] = [];
    this.firestoreService.getPropertyByFilter('Buy', this.filterPrice, this.filterLocation).get().subscribe(res => {
      console.log(res);
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }

  openDialog(){
  }
}

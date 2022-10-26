import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Property } from "../../models/property";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  disableSelect = new FormControl(false);
  filterLocation: string;
  filterBHK: any;
  filterPrice: any;
  properties: Property[];

  constructor(private firestoreService:FirestoreService) { }

  ngOnInit(): void {
  }
  logout() {

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
    this.firestoreService.getPropertyByFilter('rent', this.filterPrice, this.filterLocation).get().subscribe(res => {
      res.forEach(function (doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }
}

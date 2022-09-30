import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {FirestoreService} from "../../services/firestore.service";
import {Property} from "../../models/property";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  properties: Property[];

  constructor(private authService: AuthenticationService,
              private route: Router,
              private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    let propertyArray: Property[] = [];
    this.firestoreService.getProperty('buy').get().subscribe(res => {
      res.forEach(function(doc) {
        propertyArray.push(<Property>doc.data());
        console.log(doc.data());
      });
    });
    this.properties = propertyArray;
  }

  logout(){
    this.authService.logout().then(()=>{
      this.route.navigate(['login']);
    })
  }
}

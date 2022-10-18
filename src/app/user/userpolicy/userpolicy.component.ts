import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Insurance} from "../../models/insurance";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-userpolicy',
  templateUrl: './userpolicy.component.html',
  styleUrls: ['./userpolicy.component.css']
})
export class UserpolicyComponent implements OnInit {

  allPolicies: Insurance[] = [];

  user: User;

  constructor(private firestoreService: FirestoreService,
              private userService: UsersService) {
    this.user = this.userService.getUserDetails()!;
    console.log(this.user);
  }

  ngOnInit(): void {
    let policyArray: Insurance[] = []
    this.firestoreService.getPolicies(this.user.email).get().then(res => {
      res.forEach(function (doc) {
        policyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.allPolicies = policyArray;
    });
  }

}

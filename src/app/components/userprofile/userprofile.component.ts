import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'firebase/auth';
import { UsersService } from 'src/app/services/users.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: User;
  
  constructor(private userservice:UsersService ,private route:Router) {
    this.user = userservice.getUserDetails();
  }

  ngOnInit(): void {
  }
  viewProfile(){
    this.route.navigate(['userprofile']);
}
viewPolicy(){
  this.route.navigate(['userpolicy']);
}
}

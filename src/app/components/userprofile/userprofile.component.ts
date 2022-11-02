import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user: User;
  
  constructor(private userservice:UsersService ,private route:Router, private authservice: AuthenticationService) {
    this.user = userservice.getUserDetails();
    console.log('policy');
  }

  ngOnInit(): void {
  }
  logout() {
    this.authservice.logout().then(res => {
      console.log('hello')
      this.route.navigate(['/']);
    })
  }
  viewProfile(){
    this.route.navigate(['userprofile']);
}
viewPolicy(){
  this.route.navigate(['userpolicy']);
}
}

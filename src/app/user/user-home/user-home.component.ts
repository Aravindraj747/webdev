import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  user: User;

  constructor(private route: Router, private userService: UsersService, private authService: AuthenticationService) {
    this.user = this.userService.getUserDetails();
  }

  ngOnInit(): void {
  }

  buy(){
    return this.route.navigate(['buy']);
  }
  logout() {
    this.authService.logout().then(res => {
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

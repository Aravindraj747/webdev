import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../../models/user";
import { UsersService } from "../../services/users.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  isUserLogin:boolean=false;

  user: User;

  constructor(private route: Router, private userService: UsersService, private authService: AuthenticationService) {
    this.user = this.userService.getUserDetails();
    if(this.userService.getUserLogin()){
      this.isUserLogin=true;
    }
    console.log('home',this.isUserLogin);
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().then(res => {
      this.route.navigate(['login']);
    })
  }

  viewProfile() {
    this.route.navigate(['userprofile']);
  }

  viewPolicy() {
    this.route.navigate(['userpolicy']);
  }
}

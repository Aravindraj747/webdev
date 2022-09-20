import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private authserive:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authserive.logout().then(()=>{
      // this.login.isloggedin=false;
      this.route.navigate(['login']);
    })
  }
}

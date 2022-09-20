import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {

  constructor(private authservice:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      // this.login.isloggedin=false;
      this.route.navigate(['login']);
    })
  }

}

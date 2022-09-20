import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.css']
})
export class LeaseComponent implements OnInit {

  constructor(private route:Router,private authservice:AuthenticationService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout().then(()=>{
      // this.login.isloggedin=false;
      this.route.navigate(['login']);
    })
  }

}

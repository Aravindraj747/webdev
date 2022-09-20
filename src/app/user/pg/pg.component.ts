import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.css']
})
export class PgComponent implements OnInit {

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

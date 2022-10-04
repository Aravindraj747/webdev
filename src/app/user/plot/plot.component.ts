import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  disableSelect = new FormControl(false);
  constructor(private authservice: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authservice.logout().then(() => {
      // this.login.isloggedin=false;
      this.route.navigate(['login']);
    })
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'K';
    }
    else {
      return value;
    }
  }
}

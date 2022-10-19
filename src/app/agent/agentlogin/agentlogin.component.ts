import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgentService} from "../../services/agent.service";

@Component({
    selector: 'app-agentlogin',
    templateUrl: './agentlogin.component.html',
    styleUrls: ['./agentlogin.component.css']
})
export class AgentloginComponent implements OnInit {

    // isAgentLogin:boolean = false;
    loginSpinnerActive: boolean = false;
    agentForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    constructor(private authService: AuthenticationService,
                private route: Router,
                private _snackBar: MatSnackBar,
                private agentService: AgentService) {
    }

    ngOnInit(): void {
    }

    get email() {
        return this.agentForm.get('email');
    }

    get password() {
        return this.agentForm.get('password');
    }

    submit() {
        const {email, password} = this.agentForm.value;
        if (email === " ") {
          this.openSnackBar('Enter Email', 'Retry');
          return;
        }
        if (password === " ") {
          this.openSnackBar('Enter Password', 'Retry');
          return;
        }
        this.loginSpinnerActive = true;
        this.authService.agentLogin(email, password).then((res) => {
            // console.log(res.user);
            this.getAgentDetails(email);
            console.log('user got')
            // this.isAgentLogin=true;
            this.getAgentDetails(email);
            return this.route.navigate(['agenthome']);
        }).catch(err => {
            this.openSnackBar('Unable to login', 'Retry');
            this.loginSpinnerActive = false;
        })
    }

    async getAgentDetails(email: string) {
        await this.agentService.getAgent(email);
    }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
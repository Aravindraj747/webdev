import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgentService} from "../../services/agent.service";
import {timeSinceInMicros} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

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
        console.log(email);
        console.log(password);
        this.agentService.checkIfAgent(email).subscribe(res => {
            this.agentService.isAgent = 'true';
            console.log(res);
            if (res.docs.length > 0){
                this.authService.agentLogin(email, password).then((res) => {
                    // console.log(res.user);
                    this.getAgentDetails(email);
                    console.log('admin got')
                    this.route.navigate(['/agenthome'], { queryParams: { email: email } });
                    console.log('navigation is not working')
                }).catch(err => {
                    console.log(err)
                    this.openSnackBar('Unable to login', 'Retry');
                    this.loginSpinnerActive = false;
                })
            } else {
                this.openSnackBar('Errored Occurred', 'Retry');
                this.loginSpinnerActive = false;
            }
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
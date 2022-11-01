import { Component, OnInit } from '@angular/core';
import { FirestoreService } from "../../services/firestore.service";
import { Insurance } from "../../models/insurance";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user";
import { InsuranceStatus } from 'src/app/enum/insurance-status';

declare var Razorpay: any;

@Component({
  selector: 'app-userpolicy',
  templateUrl: './userpolicy.component.html',
  styleUrls: ['./userpolicy.component.css']
})
export class UserpolicyComponent implements OnInit {

  allPolicies: Insurance[] = [];

  policies : Insurance [] = [];

  user: User;

  message:any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'angular-razorpay-intergration';
  selectedInsurance: Insurance;

  constructor(private firestoreService: FirestoreService,
    private userService: UsersService) {
    this.user = this.userService.getUserDetails()!;
    console.log(this.user);
  }

  ngOnInit(): void {
    let policyArray: Insurance[] = []
    this.firestoreService.getPolicies(this.user.email).get().then(res => {
      res.forEach(function (doc) {
        policyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.allPolicies = policyArray;
      this.policies=this.allPolicies;
    });
  }

  options = {
    "key": "rzp_live_0FD1FY1bVAtKpp",
    "amount": "200",
    "name": "Haymant",
    "description": "Web Development",
    "image": "https://www.abhijitgatade.com/assets/img/favicon.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
          {
            detail: response,
            bubbles: true,
            cancelable: true
          }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  payNow(insurance: Insurance) {
    this.selectedInsurance = insurance;
    this.paymentId = '';
    this.error = '';
    this.options.amount = (parseInt(insurance.insuranceAmount) * 100).toString(); //paise
    this.options.prefill.name = insurance.customerName;
    this.options.prefill.email = insurance.emailID;
    this.options.prefill.contact = insurance.phoneNumber;
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
          //this.message = "Payment Failed";
          // Todo - store this information in the server
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          //this.error = response.error.reason;
        }
    );
  }

  reject(insurance: Insurance){
    let data = {
      'currentState': InsuranceStatus.REJECTED,
      'status': 'COMPLETED'
    }
    this.firestoreService.updateInsurance(insurance.id, data).then(res => {
      console.log('Insurance Rejection saved');
      insurance.currentState = InsuranceStatus.REJECTED;
    }).catch(err => {
      console.log(err);
    })
  }
}
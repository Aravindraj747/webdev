import {Component, HostListener, OnInit} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {Agent} from "../../models/agent";
import {AgentService} from "../../services/agent.service";
import {Insurance} from "../../models/insurance";
import {InsuranceStatus} from "../../enum/insurance-status";

declare var Razorpay: any;

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  agent: Agent;
  allPolicies: Insurance[] = [];
  policies: Insurance[] = [];
  types = ['Car', 'Two Wheeler', 'Commercial', 'All Products'];
  selected = 'All Products';
  map: Map<string, string> = new Map<string, string>();

  message:any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'angular-razorpay-intergration';
  selectedInsurance: Insurance;

  constructor(private firestoreService: FirestoreService,
              private agentService: AgentService) {
    this.agent = agentService.getAgentDetails();
    this.map.set('Two Wheeler', 'twoWheeler');
    this.map.set('Commercial', 'commercial');
    this.map.set('Car', 'car');
  }

  ngOnInit(): void {
    let policyArray: Insurance[] = []
    this.firestoreService.getPolicies(this.agent.email).get().then(res => {
      res.forEach(function (doc) {
        policyArray.push(<Insurance>doc.data());
        console.log(doc.data());
      });
      this.allPolicies = policyArray;
      this.policies = this.allPolicies;
    });
  }

  filterPolicy(type: string) {
    this.selected = type;
    if (type === 'All Products') {
      this.policies = this.allPolicies;
      return;
    }
    let temp: Insurance[] = [];
    this.allPolicies.forEach(policy => {
      if (policy.vehicleType === this.map.get(type)) {
        temp.push(policy);
      }
    });
    this.policies = [];
    this.policies = temp;
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

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    console.log(this.message);
    let data = {
      'currentState': InsuranceStatus.AMOUNT_PAID
    }
    this.firestoreService.updateInsurance(this.selectedInsurance.id, data).then(res => {
      console.log('Updated DB');
      this.selectedInsurance.currentState = InsuranceStatus.AMOUNT_PAID;
    }).catch(err => {
      console.log(err);
    })
  }

  reject(insurance: Insurance) {
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

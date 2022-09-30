import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Insurance} from "../../models/insurance";
import {getStorage} from "firebase/storage";
import {getDownloadURL, ref, uploadBytesResumable} from "@angular/fire/storage";
import {FirestoreService} from "../../services/firestore.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import {AgentService} from "../../services/agent.service";

enum InsuranceImageType {
    vehicleImage = 'vehicleImage',
    rcImage = 'rcImage',
    csrImage = 'csrImage'
}

@Component({
    selector: 'app-insurance',
    templateUrl: './insurance.component.html',
    styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

    spinnerActive: boolean = false;
    insuranceType = 'Insurance';
    current = 0;
    req = 2;
    insurance: Insurance = {
        id: "",
        type: this.insuranceType,
        createdDate: Timestamp.now(),
        vehicleName: "",
        rcImage: "",
        vehicleType: "",
        vehicleImage: "",
        csrImage: "",
        vehicleNumber: "",
        policyNumber: "",
        createdBy: "",
        createdByName: ""
    };

    rcImageFile: any = {}
    csrImageFile: any = {}
    vehicleImageFile: any = {}

    constructor(private route: Router,
                private storage: AngularFireStorage,
                private firestoreService: FirestoreService,
                private _snackBar: MatSnackBar,
                private agentService: AgentService,
                private activateRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activateRoute.queryParams.subscribe(params => {
            console.log(params['type']);
            this.insurance.vehicleType = params['vehicleType'];
            this.insurance.type = params['type'];
        });
    }

    chooseRC(event: any) {
        this.rcImageFile = event.target.files[0];
    }

    chooseCSR(event: any) {
        this.csrImageFile = event.target.files[0];
    }

    chooseVehicle(event: any) {
        this.vehicleImageFile = event.target.files[0];
    }

    cancel() {
        return this.route.navigate(['sellnow']);
    }

    submitInsurance() {
        this.spinnerActive = true;
        this.current = 0;
        this.insurance.type = this.insuranceType;
        this.insurance.createdByName = 'Admin';
        this.insurance.createdBy = 'Agent';
        this.insurance.createdDate = Timestamp.now();
        this.insurance.id = Math.floor(Date.now()/1000).toString();
        if (this.agentService.agent != undefined)
            this.insurance.createdByName = this.agentService.agent.name;

        let files: [any, InsuranceImageType][] = [[this.rcImageFile, InsuranceImageType.rcImage],
            [this.vehicleImageFile, InsuranceImageType.vehicleImage]];

        if (this.insurance.type === 'Claim') {
            this.req = 3;
            files.push([this.csrImageFile, InsuranceImageType.csrImage]);
        }
        Promise.all(
            files.map((item) => this.putStorageItem(item[0], item[1]))
        )
            .then((url) => {
                console.log(`All success`);
            })
            .catch((error) => {
                console.log(`Some failed: `, error.message)
            });
    }

    putStorageItem(file: any, imageType: InsuranceImageType) {
        const storage = getStorage();
        const storageRef = ref(storage, 'insurance/'+ file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                this.openSnackBar('Error occurred while saving images', 'Retry')
                console.log(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    this.insurance[imageType] = downloadURL;
                    this.current += 1;
                    this.spinnerActive = false
                    this.openSnackBar('Insurance Saved', 'Undo');
                    if (this.current === this.req) {
                        this.firestoreService.saveInsurance(this.insurance).then(res => {
                            console.log('saved');
                        }).catch(err => {
                            this.openSnackBar('Error Occurred while saving insurance', 'Retry');
                        }).finally( ()=> {
                            this.spinnerActive = false;
                        });
                    }
                });
            });
    }

    saveInsurance() {
        console.log('saving insurance');
        this.firestoreService.saveInsurance(this.insurance).then(res => {
            console.log(res);
            this.spinnerActive = false;
            this.openSnackBar('Insurance Saved', 'Undo');
        }).catch(err => {
            this.spinnerActive = false;
            this.openSnackBar('Error Occurred while saving insurance', 'Retry');
        });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 2000,
        });
    }
}

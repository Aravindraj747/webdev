import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Insurance} from "../../models/insurance";
import {getStorage} from "firebase/storage";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {FirestoreService} from "../../services/firestore.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSnackBar} from "@angular/material/snack-bar";

enum InsuranceImageType {
    vehicleImage = 'vehicleImage',
    rcImage = 'rcImage'
}

@Component({
    selector: 'app-insurance',
    templateUrl: './insurance.component.html',
    styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

    spinnerActive: boolean = false;
    typeList: any[] = ["Insurance", "Claim"];
    insuranceType = 'Insurance';
    vehicleList: any[] = ["Car", "Two Wheeler", "Commercial"]
    current = 0;
    req = 2;
    insurance: Insurance = {
        date: new Date(),
        vehicleName: "",
        rcImage: "",
        vehicleType: "",
        vehicleImage: "",
        vehicleNumber: "",
        policyNumber: ""
    };

    rcImageFile: any = {}
    csrImageFile: any = {}
    vehicleImageFile: any = {}

    constructor(private route: Router,
                private storage: AngularFireStorage,
                private firestoreService: FirestoreService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
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
        const files = [[this.rcImageFile, InsuranceImageType.rcImage], [this.vehicleImageFile, InsuranceImageType.vehicleImage]]
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
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is' + progress + '%done');
            },
            (error) => {
                this.openSnackBar('Error occurred while saving images', 'Retry')
                console.log(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('files', downloadURL);
                    this.insurance[imageType] = downloadURL;
                    this.current += 1;
                    if (this.current === this.req) {
                        this.saveInsurance();
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

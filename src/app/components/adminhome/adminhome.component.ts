import {BLACK_ON_WHITE_CSS_CLASS} from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Property} from "../../models/property";
import {FirestoreService} from "../../services/firestore.service";
import {getStorage} from "firebase/storage";
import {getDownloadURL, ref, uploadBytesResumable} from "@angular/fire/storage";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-adminhome',
    templateUrl: './adminhome.component.html',
    styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

    typeList: any[] = ["Buy", "Rent", "Land", "Commercial", "Lease", "PG"];
    property: Property = {address: "", amount:0 , details:"" , date: "", ownerName: "", photo: "", sqFeet:0 , type: ""};
    spinnerActive: boolean = false;
    photo: any = {}

    constructor(private route: Router,
                private firestoreService: FirestoreService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    choosePhoto(event: any) {
        this.photo = event.target.files[0];
    }

    save() {
        // TODO: Add empty checks
        // upload image
        this.spinnerActive = true;
        this.putStorageItem(this.photo);
    }

    putStorageItem(file: any) {
        const storage = getStorage();
        const storageRef = ref(storage, 'property/' + file.name);
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

                    this.spinnerActive = false
                    this.property.photo = downloadURL;
                    this.openSnackBar('Property Saved', 'Undo');
                    this.firestoreService.saveProperty(this.property).then(res => {
                        console.log('saved');
                    }).catch(err => {
                        this.openSnackBar('Error Occurred while saving insurance', 'Retry');
                    }).finally(() => {
                        this.spinnerActive = false;
                    });
                });
            });
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

    logout() {
        this.route.navigate(['adminlogin']);
    }
}

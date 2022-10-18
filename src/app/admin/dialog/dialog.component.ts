import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {Insurance} from "../../models/insurance";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  uploadFile: any = {};
  insurance: Insurance;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private route: Router,
              private _snackBar: MatSnackBar,
              private firestoreService: FirestoreService) {
    console.log(data);
    this.insurance = data['insurance'];
  }

  ngOnInit(): void {
  }
  chooseFile(event: any) {
    this.uploadFile = event.target.files[0];
  }
  // sendFile(){
  //   const files =this.uploadFile
  //       Promise.all(
  //           files.map((item:any) => this.putStorageItem(item))
  //       )
  //           .then((url) => {
  //               console.log(`All success`);
  //           })
  //           .catch((error) => {
  //               console.log(`Some failed: `, error.message)
  //           });
  // }
  sendFile() {
    const storage = getStorage();
    const storageRef = ref(storage, this.uploadFile.name);
    const uploadTask = uploadBytesResumable(storageRef, this.uploadFile);
    uploadTask.on('state_changed',
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
          this.saveDetails(downloadURL);
        });
      }
    )
  }

  saveDetails(downloadUrl: string) {
    this.insurance.finalDocument = downloadUrl;
    console.log(this.insurance);
    this.firestoreService.updateInsurance(this.insurance).then(res => {
      this.openSnackBar('Insurance Saved', 'close');
    }).then(err => {
      this.openSnackBar('Insurance Saved', 'Retry');
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
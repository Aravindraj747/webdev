import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  uploadFile: any = {};
  constructor(private route: Router, private _snackBar: MatSnackBar) { }

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
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
          console.log('files', downLoadURL);
          this.openSnackBar('File uploaded','close')
        });
      }
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 2000,
    });
  }
}
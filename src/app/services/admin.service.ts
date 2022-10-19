import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Admin } from "../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  admin: Admin;

  isAdmin: string;

  constructor(private firestore:AngularFirestore) { }

  getAdmin(email: string) {
    this.firestore.collection('admin').doc<Admin>(email).get().subscribe(res => {
      sessionStorage.setItem('adminLogin', this.isAdmin);
    });
  }

  getAdminLogin() {
    if (this.isAdmin === undefined) {
      this.isAdmin = sessionStorage.getItem('adminLogin')!;
    }
    return this.isAdmin;
  }

  checkIfAdmin(id:string){
    return this.firestore.collection('admin',ref=> ref.where("email", "==",id)).get();
  }
}

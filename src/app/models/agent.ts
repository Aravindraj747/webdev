import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Agent {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    creationDate: Timestamp;
    agentID: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    ifscCode: string;
    bankAccountHolderName: string;
    bankName: string;
    accountNumber: string;
    bankCity: string;
    bankPinCode: string;
}
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Claim {
    id: string;
    type: string;
    vehicleType: string;
    vehicleNumber: string;
    createdDate: Timestamp;
    csrImage: string;
    policyNumber: string;
    createdBy: string;
    createdByName: string;
    emailID: string;
    phoneNumber: string;
    createdByID: string;
    customerName: string;
    vehicleDamageImage: string;
}
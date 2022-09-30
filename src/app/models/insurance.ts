import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Insurance {
    id: string;
    type: string;
    vehicleType: string;
    vehicleName: string;
    vehicleNumber: string;
    createdDate: Timestamp;
    rcImage: string;
    vehicleImage: string;
    csrImage: string;
    policyNumber: string;
    createdBy: string;
    createdByName: string;
}
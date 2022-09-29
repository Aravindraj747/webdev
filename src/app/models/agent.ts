import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Agent {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    creationDate: Timestamp;
    agentID: string;
}
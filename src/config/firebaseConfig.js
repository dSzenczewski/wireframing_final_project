import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBnkkqFTsgUR6TFRhR0DaRqStUfPZDOxEY",
    authDomain: "wireframer-final-project-c95cb.firebaseapp.com",
    databaseURL: "https://wireframer-final-project-c95cb.firebaseio.com",
    projectId: "wireframer-final-project-c95cb",
    storageBucket: "wireframer-final-project-c95cb.appspot.com",
    messagingSenderId: "725263605069",
    appId: "1:725263605069:web:069dc2ca47ed1476526b04",
    measurementId: "G-NCXTDPSZEL"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
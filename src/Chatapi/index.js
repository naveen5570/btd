
import firebase from 'firebase';
import 'firebase/firestore';
import User from '../User';



var firebaseConfig = {
  apiKey: "AIzaSyAoCmSB4ta5sq-jXgQEOppcfOSPPhhtSMc",
  authDomain: "beatthediabetes-ddb70.firebaseapp.com",
  databaseURL: "https://beatthediabetes-ddb70.firebaseio.com",
  projectId: "beatthediabetes-ddb70",
  storageBucket: "beatthediabetes-ddb70.appspot.com",
  messagingSenderId: "1016690843275",
  appId: "1:1016690843275:web:0cbff4059987435fec3e8e",
  measurementId: "G-7KJFTB9S7P"
};
// Initialize Firebase
!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();


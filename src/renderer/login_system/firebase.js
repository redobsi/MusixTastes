import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCTmoff7do6yWqpwjPwGyewyiJ_jz0T9A0",
  authDomain: "musixtastes.firebaseapp.com",
  projectId: "musixtastes",
  storageBucket: "musixtastes.appspot.com",
  messagingSenderId: "576353030067",
  appId: "1:576353030067:web:160ad7d07e59b97d8885c6",
};


// Initialize Firebase and Firebase Authentication
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = getAuth()

export {auth}

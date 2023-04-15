import firebase from "firebase/compat/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCTmoff7do6yWqpwjPwGyewyiJ_jz0T9A0",
  authDomain: "musixtastes.firebaseapp.com",
  databaseURL: "https://musixtastes-default-rtdb.firebaseio.com",
  projectId: "musixtastes",
  storageBucket: "musixtastes.appspot.com",
  messagingSenderId: "576353030067",
  appId: "1:576353030067:web:160ad7d07e59b97d8885c6",
  measurementId: "G-4WKCVV26P1"
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

const db = getDatabase();

export { db };
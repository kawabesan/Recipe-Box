import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBngOCH27c3OVarGQNKSo7vBVSrQ03TOW4",
  authDomain: "recipe-box-f74b1.firebaseapp.com",
  projectId: "recipe-box-f74b1",
  storageBucket: "recipe-box-f74b1.appspot.com",
  messagingSenderId: "634345333579",
  appId: "1:634345333579:web:e289fc0f701520fbad7ece",
  measurementId: "G-WT3J6GQK7F"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
};

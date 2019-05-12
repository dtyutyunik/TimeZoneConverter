import firebase from 'firebase';
// require("firebase/auth");


var firebaseConfig = {
    apiKey: "AIzaSyCBhQBk07s5S0WffCF7QrqpT1h7QSWGLy0",
    authDomain: "timezoneconverter-2ff15.firebaseapp.com",
    databaseURL: "https://timezoneconverter-2ff15.firebaseio.com",
    projectId: "timezoneconverter-2ff15",
    storageBucket: "timezoneconverter-2ff15.appspot.com",
    messagingSenderId: "936073513093",
    appId: "1:936073513093:web:4ba4b9198d47aced"
  };

let fire=firebase.initializeApp(firebaseConfig);
let database = firebase.database();


export default {fire, database};

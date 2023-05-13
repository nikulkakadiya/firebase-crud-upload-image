const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyD4iatAZRFH2SeJQ44g2jf_Cz8GiG0b4g4",
    authDomain: "fir-41bec.firebaseapp.com",
    projectId: "fir-41bec",
    storageBucket: "fir-41bec.appspot.com",
    messagingSenderId: "205639738601",
    appId: "1:205639738601:web:5f866995df14df3e74fc78",
    measurementId: "G-EYGDDB7GZS"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
 
module.exports = User;
const express = require('express');
const dotenv = require("dotenv");
// var firebase = require('firebase');
const fs = require('firebase-admin');
dotenv.config({ path: "./config.env" });
var serviceAccount = require('./admin.json');

const app = express();
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
    databaseURL: "https://console.firebase.google.com/project/fir-41bec/firestore/data/~2Fusers~2Fl3alqseM9gfAux484iOz",
    authDomain: "fir-41bec.firebaseapp.com",
});
const db = fs.firestore();
const usersDb = db.collection('users');
const liam = usersDb.doc('lragozzine');

async () => (
    await liam.set({
        first: 'Liam',
        last: 'Ragozzine',
        address: '133 5th St., San Francisco, CA',
        birthday: '05/13/1990',
        age: '30'
    }).then(res => console.log(res))
)();



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server runing ${port} port `);
});

//https://ng-course-recipe-book-df45f-default-rtdb.asia-southeast1.firebasedatabase.app/
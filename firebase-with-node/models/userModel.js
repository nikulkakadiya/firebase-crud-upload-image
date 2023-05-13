const admin = require('firebase-admin');
const credentials = require('../admin.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
const db = admin.firestore();
const User = db.collection("Users");

module.exports = User;

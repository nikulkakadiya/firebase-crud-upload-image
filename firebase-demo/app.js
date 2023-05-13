const express = require('express');
const app = express();

const admin = require('firebase-admin');
const credentials = require('./admin.json');


admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = admin.firestore();

app.post('/create', async (req, res) => {
    try {
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        // const response=db.collection("users").doc(id).set(userJson);   //with unique is data store
        const response = await db.collection("users").add(userJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
})

app.get("/getAll", async (req, res) => {
    try {
        const userRef = db.collection("users");
        const response = await userRef.get();
        let resArr = [];
        response.forEach(doc => {
            resArr.push(doc.data());
        });
        res.send(resArr);
        // res.send(response.docs)
    } catch (error) {
        console.log(error);
    }
});

app.get("/findById/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch (error) {
        console.log(error);
    }
})

app.post("/update/", async (req, res) => {
    try {
        const id = req.body.id;
        const userRef = db.collection("users").doc(id)
        .update({
            firstName:req.body.firstName
        })
        res.send(userRef);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.params.id).delete();
        res.send(userRef);
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, () => {
    console.log('server is runing 3000 port');
})


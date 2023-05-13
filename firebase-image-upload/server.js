const express = require('express')
const compression = require('compression')
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })
const path = require('path')
const saltedMd5 = require('salted-md5')
const multer = require('multer')
const admin = require('firebase-admin')
const credentials = require('./admin.json');
const app = express()

const upload = multer({ storage: multer.memoryStorage() })
// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json());
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket()

let db = admin.firestore()
let a = db.collection('users')
app.post('/data', async (req, res) => {
    let docRef = a.doc(req.body.user.name)
    await docRef.set({
        hobby: req.body.user.hobby,
        age: req.body.user.age,
    });
    res.send('done');
})

app.post('/upload', upload.single('file'), async (req, res) => {
    let docRef = a.doc(req.body.user.name)
    await docRef.set({
        hobby: req.body.user.hobby,
        age: req.body.user.age,
    });
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    const fileName = name + path.extname(req.file.originalname)
    console.log(fileName);
    await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
    res.send('done');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
    console.log(`Running on ${PORT}...`)
})
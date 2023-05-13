const express = require('express');
const cors = require('cors');
const User = require('./config');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/create', async (req, res) => {
    const data = req.body;
    console.log(data);
    await User.add(data);
    res.send({ msg: "data added" });
})

app.listen(3000, () => {
    console.log('server port running 3000');
})
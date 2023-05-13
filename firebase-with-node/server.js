const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server port number is ${PORT}`);
})
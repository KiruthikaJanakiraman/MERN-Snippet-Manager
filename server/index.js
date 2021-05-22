const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000","https://snippet-client-manager.netlify.app"],
    credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//router set up
app.use("/snippet", require("./routers/snippetRouter"));
app.use("/auth", require("./routers/userRouter"));

//connect to mongoDB
mongoose.connect(
    process.env.MDB_CONNECT_STRING,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, (err) => {
    if (err) console.error(err);
    else console.log("Connected to mongoDB");
})
//bKVrbfrDXgBpOPf3
//mongodb+srv://kiru:<password>@snippet-manager.vyolw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
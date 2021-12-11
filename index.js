const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Details = require('./Models/Details')
const User = require('./Models/User')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
// local mongodb

mongoose.connect("mongodb://localhost:27017/JackFruit", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection sucess");
})
    .catch((err) => {
        console.log("Err");
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected!!!");
});


// mongo db atlas online

// mongoose.connect("mongodb+srv://bhavesh:<password>@cluster0.42y4t.mongodb.net/<collection>?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("connection sucess");
// })
// .catch((err)=>{
//     console.log("Err");
// })

const port = process.env.PORT || 5000;

//calculator form

app.post('/form', async (req, res) => {
    const newData = new Details({
        user: req.body.user,
        Bas: req.body.Bas,
        LTA: req.body.LTA,
        HRA: req.body.HRA,
        FA: req.body.FA,
        Inv: req.body.Inv,
        Rent: req.body.Rent,
        City: req.body.City,
        Med: req.body.Med,
    })
    // console.log(newData);
    await newData.save();
    res.send({ msg: "success" });
})

//auth

app.post("/register", async (req, res) => {
    const data = req.body;
    const check = await User.findOne({ username: data.username });
    if (check) return res.send({message:"Username already exists"});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const newUser = new User({
        username: data.username,
        password: hash,
    });
    // console.log(newUser);
    await newUser.save();
    res.json({ message: "Successfull" });
});

app.post("/login", async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ username: data.username });
    if (!user) return res.send("No account with the given username");
    const check = await bcrypt.compare(data.password, user.password);
    if (!check) return res.send({ msg: "Wrong Password" });
    const token = jwt.sign({ user }, "secret");
    res.json({ user, token, msg: "successfull" });
});

//host
if (process.env.NODE_ENV == "production") {
    app.use(express.static("work/build"));
}

app.listen(port, () => {
    console.log("listening");
});
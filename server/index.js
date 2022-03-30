const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const blockRoute = require("./routes/block")
const authRoute = require("./routes/auth")
const mailRoute = require("./routes/mail")
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology:true },()=>{
    console.log("Connected to MongoDB")
})
// Change

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(jsonParser)

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));


// routes

app.use("/api/block", blockRoute)
app.use("/api/auth", authRoute)
app.use("/api/mail", mailRoute)

//api

app.get("/", (req, res)=>{
    res.send("welcome to homepage")
})

// server
let serv = process.env.PORT || 5000
app.listen(serv, ()=>{
    console.log(`Server is running on ${serv}`)
})
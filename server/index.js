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
app.use(bodyParser.urlencoded({extended: true}));

// routes

app.use("/api/block", blockRoute)
app.use("/api/auth", authRoute)
app.use("/api/mail", mailRoute)

//api

app.get("/", (req, res)=>{
    res.send("welcome to homepage")
})

// server
app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
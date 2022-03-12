const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const mailRoute = require("./routes/mail")

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

// routes

app.use("/api/users", userRoute)
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
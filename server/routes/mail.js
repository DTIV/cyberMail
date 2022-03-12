const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { request } = require("express");

//create mail
//update
router.get("/", (req, res) => {
    console.log("mail page")
})

module.exports = router
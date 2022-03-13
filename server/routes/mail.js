const router = require("express").Router();
const User = require("../models/User");
const Mail = require("../models/Mail");
const bcrypt = require("bcrypt");
const { request } = require("express");
const { deleteOne } = require("../models/Mail");


//get all from sender address



//get all to address

//create mail
router.post("/", async (req, res) => {
    const newMail = new Mail(req.body)
    try{
        const savedPost = await newMail.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete mail
router.delete("/:id", async (req,res) => {
    try{
        const mail = await Mail.findById(req.params.id);
        if(mail.userAddress === req.body.userAddress){
            await mail.deleteOne();
            res.status(200).json("message deleted")
        }else{
            res.status(401).json("You can only delete emails you sent")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//get mail
router.get("/:id", async (req,res) => {
    try{
        const mail = await Mail.findById(req.params.id);
        res.status(200).json(mail)
    }catch(err){
        res.status(500).json(err)
    }
})


//get all mail
router.get("/user/all", async (req,res) =>{
    let mailArray = [];
    try{
        const currentUser = req.body.userAddress
        const userMail = await Mail.find({userAddress: currentUser})
        res.status(200).json(userMail)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router
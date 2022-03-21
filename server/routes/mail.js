const router = require("express").Router();
const User = require("../models/BlockUser");
const Mail = require("../models/Mail");
const bcrypt = require("bcrypt");
const { request } = require("express");
const { deleteOne } = require("../models/Mail");
const BlockUser = require("../models/BlockUser");

//create mail
router.post("/", async (req, res) => {
    const toAddress = req.body.toAddress
    const isBlocked = await BlockUser.findOne({userAddress: toAddress, blockAddress: req.body.userAddress})
    if(!isBlocked){
        const newMail = new Mail(req.body)
        try{
            const savedPost = await newMail.save();
            res.status(200).json(savedPost)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("User has blocked you!")
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
router.get("/all/:userAddress", async (req,res) =>{
    try{
        const currentUser = req.params.userAddress
        const userMail = await Mail.find({userAddress: currentUser})
        res.status(200).json(userMail)
    }catch(err){
        res.status(500).json(err)
    }
})

// flag mail
router.put("/flag/:id", async (req,res) => {
    
    try{
        const mail = await Mail.findById(req.params.id);
        
        let flag;
        if(mail.flagged){
            flag = false;
        }else{
            flag = true;
        }
        console.log(req.body)
        if(mail.userAddress === req.body.userAddress){
            await mail.updateOne({ flagged: flag})
            res.status(200).json(flag);
        }else{
            res.status(403).json("Not your account");
        }
        
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router
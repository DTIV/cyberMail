const router = require("express").Router();
const BlockUser = require("../models/BlockUser");
const { request } = require("express");

//block user
router.post("/:userAddress/:id", async (req, res) => {
    try{
        console.log(req.params.id)
        const check = await BlockUser.find({blockAddress : req.params.id})
        if(check.length < 1){
            if(req.params.userAddress != req.params.id){
                const blockUser = await new BlockUser({
                    userAddress: req.params.userAddress,
                    blockAddress: req.params.id,
                })
                await blockUser.save()
                res.status(200).json(`User ${req.params.userAddress} blocked ${req.params.id}`);
            }else{
                res.status(403).json("cannot block yourself")
            }
        }else{
            res.status(403).json("user already blocked")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//get all blocked
router.get("/all/:userAddress", async (req,res) =>{
    try{
        const currentUser = req.params.userAddress
        const userMail = await BlockUser.find({userAddress: currentUser})
        res.status(200).json(userMail)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete blocked user
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

module.exports = router

const router = require("express").Router();
const BlockUser = require("../models/BlockUser");
const { request } = require("express");

//block user
router.post("/:id", async (req, res) => {
    
    try{
        const check = await BlockUser.findOne({blockAddress : req.params.id, userAddress : req.body.userAddress})
        console.log(check)
        if(!check){
            if(req.body.userAddress != req.params.id){
                const blockUser = await new BlockUser({
                    blockAddress: req.params.id,
                    userAddress: req.body.userAddress,
                })
                await blockUser.save()
                res.status(200).json(`User ${req.body.userAddress} blocked ${req.params.id}`);
            }else{
                console.log("cannot block yourself")
                res.status(403).json("cannot block yourself")
            }
        }else{
            console.log("user already blocked")
            res.status(403).json("user already blocked")
        }
    }catch(err){
        console.log("ERR",err)
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
        const mail = await BlockUser.findOne({userAddress: req.body.userAddress, blockAddress: req.params.id});
        if(mail.userAddress === req.body.userAddress){
            await mail.deleteOne();
            res.status(200).json(false)
        }else{
            res.status(401).json("You can only delete emails you sent")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

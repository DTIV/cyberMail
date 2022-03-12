const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { request } = require("express");

//edit user
router.put("/:id", async(req, res)=>{
    console.log(req)
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.email){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.email = await bcrypt.hash(req.body.email, salt);
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:request.body
            });
            res.status(200).json("account updated")
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("cant edit this account!")
    }
})

//delete user
router.delete("/:id", async(req, res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete({ _id: req.params.id});
            res.status(200).json("account deleted")
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("cant delete this account!")
    }
})

//get user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json("no user found")
        }
        
    }catch(err){
        return res.status(500).json(err)
    }
})

module.exports = router

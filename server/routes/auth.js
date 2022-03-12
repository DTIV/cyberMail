const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    try{
        // secure account email
        const salt = await bcrypt.genSalt(10);
        const hashedEmail = await bcrypt.hash(req.body.email, salt)

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: hashedEmail,
            address: req.body.address,
        })
        // save user
        const user = await newUser.save()
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({address: req.body.address});
        if(user){
            const validEmail = await bcrypt.compare(req.body.email, user.email)
            if(validEmail){
                res.status(200).json(user)
            }else{
                res.status(400).json("wrong email")
            }            
        }else{
            res.status(404).json("user not found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router

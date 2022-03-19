const mongoose = require("mongoose");


const BlockUserSchema = new mongoose.Schema({
    userAddress:{
        type:String,
        required: true,
        max:64,
        unique:true
    },
    blockAddress:{
        type:String, 
        required: true,
        max:64,
        unique:true
    },
},{ timestamps: true }
)

module.exports = mongoose.model("BlockUser", BlockUserSchema)
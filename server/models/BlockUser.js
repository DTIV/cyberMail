const mongoose = require("mongoose");


const BlockUserSchema = new mongoose.Schema({
    blockAddress:{
        type:String, 
        required: true,
        max:64,
    },
    userAddress:{
        type:String,
        required: true,
        max:64
    },
},{ timestamps: true }
)

module.exports = mongoose.model("BlockUser", BlockUserSchema)
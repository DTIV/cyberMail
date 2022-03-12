const mongoose = require("mongoose");


const MailSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    fromAddress:{
        type:String,
        required:true
    },
    toAddress:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required: false
    },
    mail:{
        type:String,
        required: false
    }
},{ timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
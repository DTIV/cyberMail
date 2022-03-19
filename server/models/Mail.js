const mongoose = require("mongoose");


const MailSchema = new mongoose.Schema({
    userAddress:{
        type:String,
        required:true
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
        required: true
    },
    flagged:{
        type:Boolean,
        required: false,
        default: false
    }
},{ timestamps: true }
)

module.exports = mongoose.model("Mail", MailSchema)
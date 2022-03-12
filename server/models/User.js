const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: false,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String, 
        required: false,
        max:50,
        unique:true
    },
    address:{
        type: String,
        required: true,
        unique: true,
        max: 64
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
},{ timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
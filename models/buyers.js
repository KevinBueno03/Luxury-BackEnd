let mongoose = require("mongoose");
let validator = require("validator");
let hashPassword = require("./plugins/hashPassword");
let verificationEmail =require ("./plugins/verificationEmail");


var buyerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Invalid Email",
        },
    },
    active: {
        type:Boolean,
        default:false
    },

    password:{
        type:String,
        required:true
    },
    img:{
        type: String,
        required: false,
    }

    

 
})
 
buyerSchema.plugin(hashPassword);
buyerSchema.plugin(verificationEmail);

module.exports = mongoose.model("Buyer",buyerSchema);

let mongoose = require("mongoose");
let validator = require("validator");
let hashPassword= require("./plugins/hashPassword");

var adminSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Email no valido",
        },
    },
    password:{
        type:String,
        require:true
    },
    active:{
        type:Boolean,
        default:false
    }

});

adminSchema.plugin(hashPassword);

module.exports = mongoose.model('Admin',adminSchema);
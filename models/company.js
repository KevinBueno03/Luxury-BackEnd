let mongoose = require("mongoose");
let validator = require("validator");



var companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    calification :{
        type: Number,
        default:0
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    img: {
        type: String,
        required: false,
    },
    active:{
        type:Boolean,
        default:true
    }



})

module.exports = mongoose.model("Company",companySchema);
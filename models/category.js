let mongoose = require("mongoose");
let validator = require("validator");



var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    companies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }]

})

module.exports = mongoose.model("Category",categorySchema);
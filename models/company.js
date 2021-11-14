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
    },
    products: {
        type: Array
    }

})

module.exports = mongoose.model("Company",companySchema);
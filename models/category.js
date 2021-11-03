let mongoose = require("mongoose");


var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    companies: {
        type: Array
    }

})

module.exports = mongoose.model("Company",categorySchema);
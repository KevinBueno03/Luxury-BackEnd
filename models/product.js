let mongoose = require("mongoose");
let validator = require("validator");

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    active:{
        type:Boolean,
        default:true
    }


});

module.exports = mongoose.model("Product", productSchema);
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


});

module.exports = mongoose.model("Product", productSchema);
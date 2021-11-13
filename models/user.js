let mongoose = require("mongoose");
let validator = require("validator");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);
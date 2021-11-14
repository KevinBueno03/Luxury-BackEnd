const mongoose = require('mongoose');

const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.r3gs5.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );
} catch (e) {
    console.log("could not connect");
}

module.exports = mongoose;
////
require("./product");
require("./company");
require("./category");
require("./biker");
require("./buyer");
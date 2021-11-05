require('dotenv').config();

const express = require("express");

const {mongoose}  = require("./models/db");

//routes
const rtsIndex = require("./routes/router");

//middleware
var app = express();
app.use(express.urlencoded());
app.use(express.json());

//routers
app.use("/api", rtsIndex); // api endpoint

//server

app.listen(process.env.PORT , function () {
    console.log(`Servidor Levantado en la direccion ${process.env.PORT}` );
});
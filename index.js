require('dotenv').config();
const express = require("express");
const cors =require ("cors")
const {mongoose}  = require("./models/db");

//routes
const rtsIndex = require("./routes/router");

//middleware
var app = express();
app.use(express.urlencoded());
app.use(express.json());

//CORS
app.use(
    cors({
        origin: [`http://${process.env.IPADMIN}:${process.env.PORTADMIN}`,//APP ADMINISTRADOR
        `http://${process.env.IPBIKERS}:${process.env.PORTBIKERS}`, //APP BIKERS
        `http://${process.env.IPBUYERS}:${process.env.PORTBUYERS}`],//APP BUYERS
        credentials: true,
    })
);
//routers
app.use("/api", rtsIndex); // api endpoint

//server
app.listen(process.env.PORT , function () {
    console.log(`Servidor Levantado en la direccion ${process.env.PORT}` );
});